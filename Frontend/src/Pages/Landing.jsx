import React, { useState } from "react";
import CountryDropDown from "../Components/Country/CountryDropDown";
import DateDropDown from "../Components/Date/DateDropDown";
import Button from "react-bootstrap/Button";

const Landing = () => {
  const [display, setDisplay] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setDisplay(e.target.textContent.trim());
    setDropDown(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-6">
          <Button onClick={handleClick} className="border-4 border-black rounded-md bg-gray-500 w-44 h-14 text-2xl font-bold transition-all duration-300 ease-in-out hover:w-48 hover:h-16 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Country
          </Button>
          <Button onClick={handleClick} className="border-4 border-black rounded-md bg-gray-500 w-44 h-14 text-2xl font-bold transition-all duration-300 ease-in-out hover:w-48 hover:h-16 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Date
          </Button>
        </div>
        {dropDown && (
          <div className="w-full max-w-md">
            {display === "Country" ? (
              <CountryDropDown />
            ) : (
              <DateDropDown />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
