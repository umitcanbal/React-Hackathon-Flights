import React, {useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers/';

import styles from "./Calendar.module.css"

export default function MaterialUIPickers(props) {

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);
  // Today's date is set as default
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Only visually changes the date displayed in calendar
    
    date = formattedDate(date)
    props.onDateSelect(date);
  };

  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Departure Date"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

    </MuiPickersUtilsProvider>
  );
}


function formattedDate(d = new Date) {
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}