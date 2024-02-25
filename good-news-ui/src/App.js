import logo from "./logo.svg";
import "./App.css";
import Newsletter from "./components/Newsletter";
import Card from "./components/Card (old)/Card";
import MainArticleCard from "./components/MainArticleCard/MainArticleCard";
import HomePage from "./components/HomePage/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <div className="app-main-page">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/newsletter" element={<Newsletter />} exact />
          {/* <HomePage></HomePage> */}
        </Routes>

        {/* <Newsletter /> */}
      </div>
    </Router>
  );
}

export default App;
