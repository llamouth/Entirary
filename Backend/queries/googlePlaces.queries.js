require("dotenv").config()
const googleMapsAPIKey = process.env.GOOGLE_API_KEY;

const getNearbyPlaces = async (travelerLocation) => {
    const { longitude, latitude, limit = 5 } = travelerLocation;

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleMapsAPIKey}&location=${latitude},${longitude}&radius=1000`;
  
    const types = [
        "tourist_attraction", // Must-have for attractions
        "restaurant", // For food and dining
        "museum", // Cultural attractions
        "park", // Outdoor spaces
        "cafe", // Coffee spots
        "shopping_mall", // Shopping options
        "night_club", // Nightlife
        "art_gallery", // Art and exhibits
        "casino", // Entertainment
        "hotel" // Accommodation
    ];
     
    try {
        // Loop through the types and fetch results for each
        const promises = types.map(async (type) => {
            const response = await fetch(`${apiUrl}&type=${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                const error = await response.json();
                return { error: error.error_message || `Failed to fetch ${type}` };
            }
    
            const data = await response.json();

            if (data.status === "ZERO_RESULTS") {
                console.log("No results found.");
                return [];
            }

            const limitedResults = data.results.slice(0, limit)

            return { type, results: limitedResults };
        });
        
        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        console.log()
        // Results is an Array of objects so convert the array into a single object keyed by type to avoid looping in the frontend 
        const nearByOject =  results.reduce((acc, curr) => {
            acc[curr.type] = curr.results;
            return acc;
        }, {});
  
        return nearByOject;

    } catch (error) {
        console.error("Error fetching nearby places:", error);
        return { error: "An unexpected error occurred while fetching places" };
    }
};

const getPlaceDetails = async (place) => {
    // Implement this function to fetch details of a place based on its place_id
    const { place_id } = place;
    try {
        const apiUrl = `https://places.googleapis.com/v1/places/${place_id}?fields=internationalPhoneNumber,formattedAddress,rating,websiteUri,googleMapsUri,displayName,editorialSummary,reviews,photos,goodForChildren,restroom,accessibilityOptions,addressDescriptor,regularOpeningHours&key=${googleMapsAPIKey}`

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error_message || 'Failed to fetch place details' };
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching place details:", error);
        return { error: "An unexpected error occurred while fetching place details" };
    }
}

module.exports = {
    getNearbyPlaces, 
    getPlaceDetails
}