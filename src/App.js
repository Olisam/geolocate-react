import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage"
import LocationsPage from "./pages/LocationsPage"

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={MainPage} />
                <Route path="/locations" component={LocationsPage} />
            </div>
        </Router>
    )
}

export default App
