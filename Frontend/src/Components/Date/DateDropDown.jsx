import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../../Styles/DateDropDown.css";
import { DateContext } from "../../Context/DateContext";
import { useNavigate } from "react-router";

const DateDropDown = () => {
  const navigate = useNavigate();

  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const handleDateChange = (newDate) => {
    const startDate = newDate[0].toLocaleDateString();
    const endDate = newDate[1].toLocaleDateString();
    setSelectedDate([startDate, endDate]);
  };

  const handleSubmit = () => {
    navigate('/recommendations')
  };

  return (
    <div>
      <h1>Date Range Selector</h1>
      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        value={selectedDate}
      />
      <p>
        Selected start date:
        {selectedDate[0] ? selectedDate[0] : "Not selected"}
      </p>
      <p>
        Selected end date: {selectedDate[1] ? selectedDate[1] : "Not selected"}
      </p>
      <button
        type="submit"
        className="border-4 border-black rounded-md bg-gray-500 w-44 h-14 text-2xl font-bold transition-all duration-300 ease-in-out hover:w-48 hover:h-16 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default DateDropDown;
