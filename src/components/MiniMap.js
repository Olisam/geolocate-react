import { MapContainer, TileLayer, Marker} from "react-leaflet"
import "../App.css"

const MiniMap = ({ dataFromParent }) => {
    let centerlocation = [dataFromParent[0], dataFromParent[1]]

    if (dataFromParent.length !== 0) {
        return (
            <div className="mapz">
                <MapContainer
                    className="smallmap"
                    center={centerlocation}
                    zoom={20}
                    style={{ height: "100%" }}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={centerlocation}></Marker>
                </MapContainer>
            </div>
        )
    } else {
        return <p>loading....</p>
    }
}

export default MiniMap
