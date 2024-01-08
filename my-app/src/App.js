import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AnalysisPage from './Components/AnalysisPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Instructions from './Components/Instructions';
import FrontPage from './Components/FrontPage';

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element= {<FrontPage />}/>
                    <Route path="/instructions"element={<Instructions />} />
                    <Route path="/analysis" element={<AnalysisPage />}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App