import React from "react";
import ExperimentDetailPage from "./components/ExperimentDetailPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateExperiment from "./components/CreateExperiment";
import EditExperimentDetailPage from "./components/EditExperimentDetailPage";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/createNewExperiment"
            element={<CreateExperiment></CreateExperiment>}
          ></Route>
          <Route
            path="/experimentDetailPage/:name"
            element={<ExperimentDetailPage />}
          ></Route>
          <Route
            path="/editExperiment/:name"
            element={<EditExperimentDetailPage />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
