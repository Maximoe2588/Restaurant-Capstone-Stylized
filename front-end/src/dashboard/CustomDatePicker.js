import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';



function CustomDatePicker({ initialDate }) {
  
  const history = useHistory();
  const initialUTCDate = new Date(initialDate + 'T00:00:00Z');
  const [selectedDate, setSelectedDate] = useState(initialUTCDate);

 
 const today = new Date();
 const minDate = today; 
 const maxDate = addDays(today, 60); 


  useEffect(() => {
    setSelectedDate(new Date(initialDate + 'T00:00:00Z'));
  }, [initialDate]);


  const handleDateChange = (date) => {
    try {
      setSelectedDate(date);
      const formattedDate = date.toISOString().substring(0, 10);
      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
      console.error("Error in handleDateChange:", error);
    }
  };


  console.log('CustomDatePicker: selectedDate', selectedDate.toISOString());

  return (
    <div className="date-navigation-container" >
   
    <DatePicker 
        showIcon
        valueDefault={null}
        onChange={handleDateChange} 
        placeholderText="Select Date"
        helperText="Reserve up to 60 days in advance"
        dateFormat="yyyy-MM-dd" 
        minDate={minDate}
        maxDate={maxDate}
        appearance="subtle"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
        renderCustomHeader={({ 
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
        <div className="monthCalendar" >
          <button onClick ={decreaseMonth} disabled={prevMonthButtonDisabled} >
           &larr;
          </button>
          <span>
           {monthDate.toLocaleString('default', { month: 'long'})} {monthDate.getFullYear()}
          </span>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} >
            &rarr;
          </button>
          </div>
        )}
        />
     </div>
  );
}

export default CustomDatePicker;
