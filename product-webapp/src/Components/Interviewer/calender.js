import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
    const onDateChange = (newdate) =>{
      setDate(newdate);
      console.log(date);
    }
  return (
    <div>
      <Calendar onChange={onDateChange} value={date} />
    </div>
  );
}

export default MyCalendar;
