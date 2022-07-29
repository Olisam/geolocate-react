import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage"
import LocationsPage from "./pages/LocationsPage"
import DetailMapPage from "./pages/DetailMapPage"
import ZoomedMapPage from "./pages/ZoomedMapPage"

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={MainPage} />
                <Route path="/locations" component={LocationsPage} />
                <Route path="/map" component={DetailMapPage} />
                <Route path="/zoommap/:note" component={ZoomedMapPage} />
            </div>
        </Router>
    )
}

export default App
