require("dotenv").config()
const googleMapsAPIKey = process.env.GOOGLE_API_KEY;

const getNearbyPlaces = async (travelerLocation) => {
    const { country, city, limit = 5 } = travelerLocation;

    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${googleMapsAPIKey}`;
  
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

    const countryArr = country.split(' ')
    let newquery = city ? country : `${city},%20${country}`
    
    if(city && city.split(' ').length > 1){
        const cityArr = city.split(' ')
        newquery = cityArr.reduce((acc, curr) =>{
            return `${acc}%20${curr}`
        })
        newquery += `,%20${country}` 
    }

    if(countryArr.length > 1 ){
        const countryQuery = countryArr.reduce((acc, curr) =>{
            return `${acc}%20${curr}`
        })
        newquery = `${city},%20${countryQuery}`
    }
     
    try {
        // Loop through the types and fetch results for each
        const promises = types.map(async (type) => {
            const response = await fetch(`${apiUrl}&query=${type}%20in%20${newquery}`);
    
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
        
        const results = await Promise.all(promises);

        // Results is an Array of objects so convert the array into a single object keyed by type to avoid looping in the frontend 
        const nearByObject =  results.reduce((acc, curr) => {
            acc[curr.type] = curr.results;
            return acc;
        }, {});
  
        return nearByObject;

    } catch (error) {
        console.error("Error fetching nearby places:", error);
        return { error: "An unexpected error occurred while fetching places" };
    }
};

const getPlaceDetails = async (place) => {
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

const getGeoData = async ( place ) => {
    const { street_number, street_name, city, state } = place

    if (!street_number ||!street_name ||!city ||!state) {
        return { error: 'Missing required address details' };
    }

    const streetNameArr = street_name.split(' ')
    let newStreetName = street_name

    if(streetNameArr.length > 1){
        newStreetName = streetNameArr.reduce((acc, curr) =>{
            return `${acc}+${curr}`
        })
    }

    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${street_number}+${newStreetName},+${city},+${state}&key=${googleMapsAPIKey}`

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error_message || 'Failed to fetch place details' };
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching place geodata:", error);
        return { error: "An unexpected error occurred while fetching Geo data" };
    }
}

module.exports = {
    getNearbyPlaces, 
    getPlaceDetails,
    getGeoData
}