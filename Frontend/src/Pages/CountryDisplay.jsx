import React, { useContext, useState } from 'react'
import { CountryContext } from '../Context/CountryContext'

const CountryDisplay = () => {

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

    useEffect( async () => {
        fetch(`${API}/googlePlaces/nearBy`, {
            body: JSON.stringify(requestedLocation),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then( res => res.json())
            .then( res => {
                setRecommendations(res)
            })
            .catch( err => console.error( err ) );
    }, [])

    return (
        <div>
        
        </div>
    )
}

export default CountryDisplay
