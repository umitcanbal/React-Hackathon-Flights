import React, { Component } from 'react'

export class SearchMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {onInputChange, isCheckboxOn, clickCheckBox, clickSearchButton, departure, arrival} = this.props

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input type="text" placeholder="Departure City" name="departure" list="departure" onChange={onInputChange} />
          <input type="text" placeholder="Arrival City" name="arrival" list="arrival" onChange={onInputChange} />
          <label>
              <input type="checkbox" defaultChecked={isCheckboxOn} onChange={clickCheckBox} /> Only direct flights
          </label>
          <button onClick={clickSearchButton}>Search..!</button>
        </div>

        <datalist id="departure" >
          {departure ? departure.locations.map((city, index) =>
              <option
                  key={index}
                  value={`${city.code}`}
              >
                  {city.name}
              </option>
          ) : undefined}
        </datalist>

        <datalist id="arrival" >
          {arrival ? arrival.locations.map((city, index) =>
              <option
                  key={index}
                  value={`${city.code}`}
              >
                  {city.name}
              </option>
          ) : undefined}
        </datalist>
      </div>
    )
  }
}

export default SearchMenu
