import React, { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"
import Wave from "react-wavify"

const LocationsPage = () => {
    let [places, setPlaces] = useState([])

    let [times, setTimes] = useState([])

    useEffect(() => {
        getPlaces()
        getTime()
    }, [])

    let getPlaces = async () => {
        const locationsRef = collection(db, "locations")
        const data = await getDocs(locationsRef)

        let dataTemp = []

        data.docs.forEach((doc) => {
            dataTemp.push(doc.data())
        })

        dataTemp.forEach((doc, index) => {
            if (doc.hasOwnProperty("timestamp") !== true) {
                console.log("false")
                doc.timestamp = Number(0)
            } else {
                console.log("true")
                console.log(typeof doc.timestamp)
            }
        })

        dataTemp.sort(function (x, y) {
            return y.timestamp - x.timestamp
        })

        setPlaces(dataTemp.map((doc) => ({ ...doc, id: doc.id })))
    }

    let getTime = async () => {
        const locationsRef = collection(db, "locations")
        const data = await getDocs(locationsRef)

        let dataTemp = []

        data.docs.forEach((doc) => {
            dataTemp.push(doc.data())
        })

        dataTemp.forEach((doc, index) => {
            if (doc.hasOwnProperty("timestamp") !== true) {
                console.log("false")
                doc.timestamp = Number(0)
            } else {
                console.log("true")
                console.log(typeof doc.timestamp)
            }
        })

        dataTemp.sort(function (x, y) {
            return y.timestamp - x.timestamp
        })

        const timearray = []

        dataTemp.forEach((doc) => {
            if (doc.timestamp !== null && doc.timestamp !== 0) {
                const milliseconds = doc.timestamp
                const dateObject = new Date(milliseconds)
                const humanDate = dateObject.toLocaleString()
                timearray.push(humanDate)
            } else {
                timearray.push(" before 1 aug ")
            }
        })

        setTimes(timearray.map((time) => ({ time })))
    }

    //const position = [50.41533, -4.5878783]

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

            <div className="app-table">
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
                                <th>Time</th>
                            </tr>
                            {places.map((place, index) => {
                                return (
                                    <tr className="main-list-item">
                                        <td>
                                            <Link
                                                to={`/zoommap/${place.latitude}&${place.longitude}`}
                                            >
                                                <div>{place.description}</div>
                                            </Link>
                                        </td>
                                        <td>{place.latitude}</td>
                                        <td>{place.longitude}</td>
                                        <td>{times[index].time}</td>
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
