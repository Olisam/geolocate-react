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

    return (
        <div>
          
        </div>
    )
}

export default LocationsPage