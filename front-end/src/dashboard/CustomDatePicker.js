import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ initialDate }) {
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));
  const history = useHistory();

  const handleDateChange = (date) => {
    try {
      console.log('Selected date in CustomDatePicker:', date); 
      setSelectedDate(date);
      const formattedDate = date.getFullYear() + '-' 
                            + String(date.getMonth() + 1).padStart(2, '0') + '-' 
                            + String(date.getDate()).padStart(2, '0');

      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
      console.error("Error in handleDateChange:", error);
      // Optionally, you could set an error state here and display it in the UI.
    }
  };

  return (
    <div className="mx-auto justify-content-center text-center" >
    <DatePicker selected={selectedDate} onChange={handleDateChange} />
    </div>
  );
}

export default CustomDatePicker;
