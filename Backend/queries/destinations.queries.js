const destinationApi = 'https://opentripmap-places-v1.p.rapidapi.com/en/places/'
const apiKey = '30b137ca19mshb02a57a0a6243fep172e6djsnd53cfb06e40f'

// Get all destinations
const getAllDestinations = async (place) => {
  try {
    const response = await fetch(`${destinationApi}geoname?name=${place}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    });

    if (!response.ok) {

      const error = await response.json();
      return { error: error.error_message || 'Failed to fetch location' };
    }

    return await response.json();
  } catch (error) {
    console.error("Error retrieving destinations:", error);
    throw new Error("Could not retrieve destinations");
  }
};

const getNearbyPlaces = async ( travelerLocation ) => {
  const { longitude, latitude } = travelerLocation;
  try {
    const response = await fetch(`${destinationApi}radius=1000&lon=${longitude}&lat=${latitude}`, { headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }})

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error_message || 'Failed to fetch location' };
    }

    return await response.json();

  } catch (error) {
    return error
  }
}

// // Get a single destination by ID
// const getDestinationById = async (id) => {
//   try {
//     const destination = await db.oneOrNone("SELECT * FROM destinations WHERE id = $1", [id]);
//     if (!destination) {
//       throw new Error("Destination not found");
//     }
//     return destination;
//   } catch (error) {
//     console.error("Error retrieving destination:", error);
//     throw new Error("Could not retrieve destination");
//   }
// };

// // Create a new destination
// const createDestination = async (destination) => {
//   const { country, city, name, description, latitude, longitude } = destination;
//   try {
//     const newDestination = await db.one(
//       `INSERT INTO destinations (country, city, name, description, latitude, longitude) 
//        VALUES ($1, $2, $3, $4, $5, $6) 
//        RETURNING id, country, city, name, description, latitude, longitude;`,
//       [country, city, name, description, latitude, longitude]
//     );
//     return newDestination;
//   } catch (error) {
//     console.error("Error creating destination:", error);
//     throw new Error("Could not create destination");
//   }
// };

// // Update an existing destination
// const updateDestination = async (id, updates) => {
//   const { country, city, name, description, latitude, longitude } = updates;

//   const query = `
//     UPDATE destinations 
//     SET 
//       country = COALESCE($1, country), 
//       city = COALESCE($2, city), 
//       name = COALESCE($3, name), 
//       description = COALESCE($4, description), 
//       latitude = COALESCE($5, latitude), 
//       longitude = COALESCE($6, longitude)
//     WHERE id = $7
//     RETURNING id, country, city, name, description, latitude, longitude;`;

//   const params = [country, city, name, description, latitude, longitude, id];

//   try {
//     const updatedDestination = await db.oneOrNone(query, params);
//     if (!updatedDestination) {
//       throw new Error("Destination not found or could not be updated");
//     }
//     return updatedDestination;
//   } catch (error) {
//     console.error("Error updating destination:", error);
//     throw new Error("Could not update destination");
//   }
// };

// // Delete (soft delete) a destination
// const deleteDestination = async (id) => {
//   try {
//     const deletedDestination = await db.result(
//       `DELETE FROM destinations WHERE id = $1;`,
//       [id]
//     );
//     if (deletedDestination.rowCount === 0) {
//       throw new Error("Destination not found or could not be deleted");
//     }
//     return { message: "Destination successfully deleted" };
//   } catch (error) {
//     console.error("Error deleting destination:", error);
//     throw new Error("Could not delete destination");
//   }
// };

module.exports = {
  getAllDestinations,
  getNearbyPlaces
};
