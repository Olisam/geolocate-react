import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage"

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={MainPage} />
            </div>
        </Router>
    )
}

export default App
