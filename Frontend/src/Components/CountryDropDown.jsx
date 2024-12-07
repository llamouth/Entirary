import React, { useState } from 'react';
import DateDropDown from './DateDropDown';

const CountryDropDown = ({vistorsSelections, setVistorsSelections}) => {

  const [calendarDropDown, setCalendarDropDown] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCalendarDropDown(true)
  };

  const handleChange = (e) => {
    setVistorsSelections({
      ...vistorsSelections, 
      Country: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        onChange={handleChange}
        value={vistorsSelections.Country}
        placeholder="Enter country"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="border-4 border-black rounded-md bg-gray-500 w-44 h-14 text-2xl font-bold transition-all duration-300 ease-in-out hover:w-48 hover:h-16 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Submit
      </button>
      {calendarDropDown && <DateDropDown />}
    </form>
  );
};

export default CountryDropDown;
