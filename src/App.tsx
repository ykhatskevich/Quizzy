
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectCategory from "./pages/SelectCategory";
import SelectDifficulty from "./pages/SelectDifficulty";
import QuizPage from "./pages/QuizPage";


function App() {
  

  return (
    <Router>
    <div className="bg-gray-800 h-screen">
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/category" element={<SelectCategory />} />
    <Route path="/difficulty" element={<SelectDifficulty />} />
    <Route path="/quiz" element={<QuizPage />} />
    
    
    </Routes>
    </div>
    </Router>
  )
}

export default App


