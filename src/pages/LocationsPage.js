import React, { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"

const LocationsPage = () => {
    let [places, setPlaces] = useState([])

    useEffect(() => {
        getPlaces()
    }, [])

    let getPlaces = async () => {
        const locationsRef = collection(db, "locations")
        const data = await getDocs(locationsRef)
        setPlaces(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    return (
        <div className="container">
            <div className="app">
                <div className="main">
                    <div className="main-header">
                        <h3 className="main-title">Geolocator</h3>
                        <Link to={`/`}>
                            <h3>Back</h3>
                        </Link>
                    </div>
                    <div className="main-list">
                        <div>
                            {places.map((place) => {
                                return (
                                    <div className="main-list-item">
                                        <h1>{place.description}</h1>
                                        <p>Latitude: {place.latitude}</p>
                                        <p>Longitude: {place.longitude}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationsPage
