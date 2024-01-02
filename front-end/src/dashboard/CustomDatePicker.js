import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';


function CustomDatePicker({ initialDate }) {
  
  const history = useHistory();
  const initialUTCDate = new Date(initialDate + 'T00:00:00Z');
  const [selectedDate, setSelectedDate] = useState(initialUTCDate);

 // Calculate min and max dates
 const today = new Date();
 const minDate = today; // Today as the minimum date
 const maxDate = addDays(today, 60); // 60 days from today as the maximum date


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
    <div className="mx-auto justify-content-center text-center" >
   
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
