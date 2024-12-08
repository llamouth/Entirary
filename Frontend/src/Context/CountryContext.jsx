import React, { createContext, useState, useContext } from "react";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
  
    return (
      <CountryContext.Provider value={{
          selectedCountry, 
          setSelectedCountry 
        }}>
        {children}
      </CountryContext.Provider>
    );
  };