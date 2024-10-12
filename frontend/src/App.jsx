import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./screens/MainPage";
import LoginScreen from "./screens/LoginScreen"; // Import the LoginScreen component
import React from 'react';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;