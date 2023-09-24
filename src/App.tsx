
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"


function App() {
  

  return (
    <Router>
    <div className="bg-gray-800 h-screen">
      <HomePage />
    </div>
    </Router>
  )
}

export default App


