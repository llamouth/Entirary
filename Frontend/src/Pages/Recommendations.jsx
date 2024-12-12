import React, { useContext, useState, useEffect } from 'react'
import { CountryContext } from '../Context/CountryContext'

const Recommendations = () => {

    const API = import.meta.env.VITE_BASE_URL; 
    const { selectedCountry } = useContext(CountryContext)
    const requestedLocation = {
        country: selectedCountry
    }
    const [ recommendations, setRecommendations ] = useState({})

    if( selectedCountry.includes(',') ){
        let travelerArr = selectedCountry.split(',')
        requestedLocation.country = travelerArr[1].trim()
        requestedLocation.city = travelerArr[0].trim()
    }

    useEffect( () => {
        fetch(`${API}/googlePlaces/nearBy`, {
            method: 'POST',  
            body: JSON.stringify(requestedLocation),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then( res => res.json())
            .then( res => {
                setRecommendations(res)
                console.log(res)
            })
            .catch( err => console.error( err ) );
    }, [])

    return (
        <div>
            <h1>Country: {selectedCountry}</h1>
            <h2>Top 5 nearby places:</h2>
            { recommendations.restaurant && Array.isArray(recommendations.restaurant) && recommendations.restaurant.map( (item, index) => (
                <p key={index}>{index+1}. {item.name}</p>
            ))} 

            { recommendations.error && <p>{recommendations.error}</p>} 

            { recommendations.status === 'ZERO_RESULTS' && <p>No nearby places found.</p>} 

            { recommendations.status === 'OK' && <p>Data loaded successfully.</p>} 

            { recommendations.status === 'REQUEST_DENIED' && <p>API request denied.</p>} 

            { recommendations.status === 'INVALID_REQUEST' && <p>Invalid request.</p>}
        </div>
    )
}

export default Recommendations
