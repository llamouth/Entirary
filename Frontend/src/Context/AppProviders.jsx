import React from "react";
import { DateProvider } from "./DateContext";
import { CountryProvider } from "./CountryContext";

const AppProviders = ({ children }) => {
  return (
    <DateProvider>
        <CountryProvider>
            {children}
        </CountryProvider>
    </DateProvider>
  );
};

export default AppProviders;
