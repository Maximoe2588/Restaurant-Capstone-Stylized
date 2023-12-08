import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ initialDate }) {
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));
  const history = useHistory();

  const handleDateChange = (date) => {
    try {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
      console.error("Error in handleDateChange:", error);
      // Optionally, you could set an error state here and display it in the UI.
    }
  };

  return (
    <>
    <DatePicker selected={selectedDate} onChange={handleDateChange} />
    </>
  );
}

export default CustomDatePicker;
