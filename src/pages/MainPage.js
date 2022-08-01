import React, { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { addDoc, collection } from "firebase/firestore"
import { Link } from "react-router-dom"
import MiniMap from "../components/MiniMap"
import Wave from "react-wavify"

const MainPage = () => {
    let [location, setLocation] = useState([])
    let [locationdescription, setDescription] = useState([])

    useEffect(() => {
        getLocation()
        const interval = setInterval(() => {
            getLocation()
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    let getLocation = async () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let location = []
            location.push(position.coords.latitude)
            location.push(position.coords.longitude)

            let data = location
            setLocation(data)
        })
    }

    let handleSubmit = () => {
        const locationRef = collection(db, "locations")
        const currentTimestamp = Date.now()

        addDoc(locationRef, {
            description: locationdescription,
            latitude: location[0],
            longitude: location[1],
            timestamp: currentTimestamp,
        })

        setDescription("")
    }

    return (
        <div className="container">
            <Wave
                className="wave"
                fill="#f79902"
                paused={false}
                options={{
                    height: 20,
                    amplitude: 20,
                    speed: 0.25,
                    points: 3,
                }}
            />

            {/* <div className="side" id="leftside">

            </div>
            <div className="side" id="rightside">

            </div> */}

            <div className="app">
                <div className="main">
                    <div className="main-header">
                        <h3 className="main-title">Geolocator</h3>
                        <Link to={`/locations`}>
                            <h3>Saved locations</h3>
                        </Link>
                    </div>
                    <div className="main-body">
                        <p> Latitude: {location[0]} </p>
                        <p> Longitude: {location[1]} </p>

                        <textarea
                            className="textarea"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            value={locationdescription}
                        ></textarea>
                        <div className="buttondiv">
                            <button
                                className="sendbutton"
                                onClick={handleSubmit}
                            >
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
                <MiniMap dataFromParent={location} />
            </div>
        </div>
    )
}

export default MainPage
