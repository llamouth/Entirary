import React, { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import "../Styles/DateDropDown.css"
import { DateContext } from '../Context/DateContext'

const DateDropDown = ({vistorsSelections, setVistorsSelections}) => {
  const {selectedDate, setSelectedDate } = useContext(DateContext)

  const handleDateChange = (newDate) => {
    const startDate = newDate[0].toLocaleDateString()
    const endDate = newDate[1].toLocaleDateString()
    setSelectedDate([startDate, endDate])
    setVistorsSelections({
      ...vistorsSelections,
      Date: [startDate, endDate]
    })
  };

  return (
    <div>
      <h1>Date Range Selector</h1>
      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        value={selectedDate}
      />
      <p>Selected start date: {  selectedDate[0] ? selectedDate[0] : 'Not selected'  }</p>
      <p>Selected end date:  {  selectedDate[1] ? selectedDate[1] : 'Not selected' }</p>
    </div>
  );
}

export default DateDropDown
