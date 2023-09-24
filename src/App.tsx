
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectCategory from "./pages/SelectCategory";


function App() {
  

  return (
    <Router>
    <div className="bg-gray-800 h-screen">
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/category" element={<SelectCategory />} />
    
    
    </Routes>
    </div>
    </Router>
  )
}

export default App


