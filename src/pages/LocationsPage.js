import React, { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
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

    //const position = [50.41533, -4.5878783]

    return (
        <div className="container">
            <div className="app">
                <div className="main">
                    <div className="main-header">
                        <h3 className="main-title">Geolocator</h3>
                        <Link to={`/map`}>
                            <h3>Map view</h3>
                        </Link>
                        <Link to={`/`}>
                            <h3>Back</h3>
                        </Link>
                    </div>
                    <div className="main-list">
                        <table>
                            <tr>
                                <th>Description</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                            {places.map((place) => {
                                return (
                                    <tr className="main-list-item">
                                        <td>
                                            <Link to={`/zoommap/${place.latitude}&${place.longitude}`}>
                                                <div>{place.description}</div>
                                            </Link>
                                        </td>
                                        <td>{place.latitude}</td>
                                        <td>{place.longitude}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationsPage
