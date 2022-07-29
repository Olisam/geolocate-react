import React, { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
//import { Link } from "react-router-dom"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const LocationsPage = ({match}) => {

    let notedescription = match.params.note
 
    let centerlat = notedescription.split('&')[0]
    let centerlong = notedescription.split('&')[1]
    
    let [pins, setPins] = useState([])

    useEffect(() => {
        getPins()
        
    }, [])

    let getPins = async () => {
        const locationsRef = collection(db, "locations")
        const data = await getDocs(locationsRef)
        setPins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const position = [centerlat, centerlong]

    return (
        <div>
            <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {pins.map((pin) => {
                    return (
                        <Marker position={[pin.latitude,pin.longitude]}>
                            <Popup>
                                {pin.description} <br />
                            </Popup>
                        </Marker>
                    )
                })}

            </MapContainer>
        </div>
    )
}

export default LocationsPage