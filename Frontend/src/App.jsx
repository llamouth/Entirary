import "./index.css";
import React from "react";
import { Routes, Route } from "react-router";
import AppProviders from "./Context/AppProviders";
import Landing from "./Pages/Landing";
import CountryDisplay from "./Pages/CountryDisplay";
// Import other components as needed

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/destinations" element={<CountryDisplay />} />
        </Routes>
      </div>
    </AppProviders>
  );
}

export default App;
