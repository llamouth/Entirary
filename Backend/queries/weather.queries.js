require("dotenv").config()
const __OW_ApiKey = process.env.OW_API_KEY;
const OW_apiUrl = 'https://api.openweathermap.org/data/2.5/'

const getPastWeather = async ( travelerRequest ) => {
    const { longitude, latitude, start_date, end_date } = travelerRequest
    console.log(travelerRequest)
    try {
        const apiUrl = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`

        const response = await fetch(apiUrl)

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error_message || 'Failed to fetch Weather' };
        }

        return await response.json();
    } catch (error) {
      console.error("Error retrieving destinations:", error);
      throw new Error("Could not retrieve destinations");
    }
};

// const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

const getCurrentWeather = async ( travelerRequest ) => {
    const { city, country } = travelerRequest;

    const apiUrl = `${OW_apiUrl}weather?units=metric&q=${city ? city : country}&appid=${__OW_ApiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error_message || 'Failed to fetch Weather' };
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching current weather:", error);
        throw new Error("Could not fetch current weather");
    }
}

const getFiveDayForeCast = async ( travelerRequest ) => {
    const { latitude, longitude } = travelerRequest;

    const apiUrl = `${OW_apiUrl}forecast/?lat=${latitude}&lon=${longitude}&appid=${__OW_ApiKey}`

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const error = await response.json();
            return { error: error.error_message || 'Failed to fetch Weather' };
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching current weather:", error);
        throw new Error("Could not fetch current weather");
    }
}

module.exports = { 
    getPastWeather, 
    getCurrentWeather,
    getFiveDayForeCast
};