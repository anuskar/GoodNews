import logo from "./logo.svg";
import "./App.css";
import Newsletter from "./components/Newsletter";
import Card from "./components/Card (old)/Card";
import MainArticleCard from "./components/MainArticleCard/MainArticleCard";
import HomePage from "./components/HomePage/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import NewsByTopic from "./components/NewsByTopic/NewsByTopic";
import Account from "./components/Account/Account";
import { useEffect, useState } from "react";

function App() {
  const [userTopics, setUserTopics] = useState(null);

  function fetchUserTopics() {
    fetch("/getUserTopics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setUserTopics(data);
    })
    .catch((error) => console.error(error));
  }
  
  useEffect(() => {
    fetchUserTopics(); // Call it here to load topics initially
  }, []);

  return (
    <Router>
      <div className="app-main-page">
        <Navbar userTopics={userTopics}></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          {userTopics &&
            Object.keys(userTopics).map((topicKey) => (
              <Route
                key={topicKey}
                path={`/newsbytopic/${userTopics[topicKey]}`}
                element={<NewsByTopic topic={userTopics[topicKey]} />}
                exact
              />
            ))}
          <Route path="/account" element={<Account onTopicsUpdated={fetchUserTopics}/>} exact />
        </Routes>

        {/* <Newsletter /> */}
      </div>
    </Router>
  );
}

export default App;
