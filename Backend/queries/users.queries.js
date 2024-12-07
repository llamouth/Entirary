const db = require('../db/dbconfig')
const bcrypt = require("bcrypt");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

// Get all users
const getAllUsers = async () => {
  try {
    const users = await db.any("SELECT * FROM users WHERE deleted = FALSE");
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Could not retrieve users");
  }
};

// Get one user by ID
const getOneUser = async (id) => {
  try {
    const oneUser = await db.oneOrNone("SELECT * FROM users WHERE id = $1 AND deleted = FALSE", [id]);
    if (!oneUser) {
      throw new Error("User not found");
    }
    return oneUser;
  } catch (error) {
    console.error("Database error in getOneUser:", error);
    throw new Error("Could not retrieve user");
  }
};

// Create a new user
const createUser = async (user) => {
  const { first_name, last_name, username, email, password } = user;
  try {
    console.log(user)
    console.log(SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await db.one(
      `INSERT INTO users (first_name, last_name, username, email, password_hash) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, first_name, last_name, username, email;`,
      [first_name, last_name, username, email, passwordHash]
    );
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};

// Update a user
// Update a user
const updateUser = async (id, updates) => {
  const { first_name, last_name, username, email, bio, password } = updates;
  
  // Prepare the data for updating
  let query = `UPDATE users 
                SET first_name = $1, last_name = $2, username = $3, email = $4, bio = $5, updated_at = CURRENT_TIMESTAMP`;
  let params = [first_name, last_name, username, email, bio];
  
  // If password is provided, hash it and add to the query
  if (password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    query += `, password_hash = $6`;
    params.push(passwordHash);
  }

  // Add user id to params
  
  // Add condition to update the specific user
  query += ` WHERE id = $${params.length + 1} AND deleted = FALSE 
  RETURNING id, first_name, last_name, username, email, bio;`;
  
  params.push(id);

  try {
    const updatedUser = await db.oneOrNone(query, params);
    if (!updatedUser) {
      throw new Error("User not found or could not be updated");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
};
  

// Soft delete a user
const deleteUser = async (id) => {
  try {
    const deletedUser = await db.result(
      `UPDATE users 
      SET deleted = TRUE, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1;`,
      [id]
    );
    if (deletedUser.rowCount === 0) {
      throw new Error("User not found or could not be deleted");
    }
    return { message: "User successfully deleted" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
};

const loginUser = async (user) => {
  try {
    const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username)
    if(!loggedInUser){
      return false
    }

    const passwordMatch = await bcrypt.compare(user.password, loggedInUser.password_hash)


    if(!passwordMatch){
      return false
    }
    return loggedInUser
  } catch (err) {
    return err
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
