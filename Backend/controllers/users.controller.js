const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const { authenticateToken } = require("../auth/auth");
const {
  createUser,
  getAllUsers,
  getOneUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../queries/users.queries");

// Get all users
users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers.length) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server error", info: error });
  }
});

// Get a specific user by ID
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await getOneUser(id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server error", info: error });
  }
});

// Create a new user
users.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      secret
    );

    const user = {
      user_id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Invalid user information", info: error });
  }
});

// Login a user
users.post("/login", async (req, res) => {
  try {
    const userLoggedIn = await loginUser(req.body);
    if (!userLoggedIn) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    console.log(userLoggedIn)

    const token = jwt.sign(
      { userId: userLoggedIn.id, username: userLoggedIn.username },
      secret
    );

    const user = userLoggedIn;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", info: err });
  }
});

// Update a user
users.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", info: error });
  }
});

// Soft delete a user (mark as deleted)
users.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json({ success: `Successfully deleted user ${id}` });
    } else {
      res.status(404).json({ error: "User not found or could not be deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", info: error });
  }
});

module.exports = users;