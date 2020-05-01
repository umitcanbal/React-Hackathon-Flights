import React, { Component } from 'react'

import Calendar from "./Calendar/Calendar.jsx"

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import styles from "./SearchMenu.module.css"

export class SearchMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onInputChange, departure, arrival, onInputSelect, onDateSelect, clickCheckBox, clickSearchButton } = this.props

    return (
      // <div style={{ display: "flex", flexDirection:"column", justifyContent: "space-around", alignItems: "center", height: "30vh", }}>
      <div className={styles.container}>
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <div className={styles.container2}>


          <Autocomplete
            id="departure"
            onInputChange={onInputChange}
            onChange={(event, value) => onInputSelect(value)}
            options={
              departure ?
                departure.locations.map(city => {
                  return { title: city.name, cityCode: city.code, id: "departure" }
                })
                :
                [{ title: "" }]
            }
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Departure" variant="outlined" />}
          />

          <Autocomplete
            id="arrival"
            onInputChange={onInputChange}
            onChange={(event, value) => onInputSelect(value)}
            options={
              arrival ?
                arrival.locations.map(city => {
                  return { title: city.name, cityCode: city.code, id: "arrival" }
                })
                :
                [{ title: "" }]
            }
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Arrival" variant="outlined" />}
          />

        </div>

        <Calendar onDateSelect={onDateSelect} />

        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <div className={styles.container2}>
        
          <FormControlLabel
            control={<Checkbox color="primary" onChange={clickCheckBox} />}
            label="Only direct flights"
            labelPlacement="end"
          />

          <Button variant="contained" color="primary" onClick={clickSearchButton} >
            Search
          </Button>
        </div>

      </div>
    )
  }
}

export default SearchMenu