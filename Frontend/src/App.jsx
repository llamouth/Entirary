import './index.css'
import React from "react";
import { DateProvider } from "./Context/DateContext";
import Landing from "./Components/Landing";
// Import other components as needed

function App() {
  return (
    <DateProvider>
      <div className="App">
        <Landing />
        {/* Other components */}
      </div>
    </DateProvider>
  );
}

export default App;

