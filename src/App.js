import React from 'react';
import ExperimentDetailPage from './components/ExperimentDetailPage';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CreateExperiment from './components/CreateExperiment';

const App = () => {
    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element= {<HomePage />}></Route>
                    <Route path="/createNewExperient" element={<CreateExperiment></CreateExperiment>}></Route>
                    <Route path="/experimentDetailPage" element= {<ExperimentDetailPage />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;