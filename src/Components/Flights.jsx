import React from "react";
import { DateTime } from 'luxon';

export default class Flights extends React.Component {
  render() {
    const {data} = this.props;
    if(!data.length) return <p>No flight found for the selected route! Try something else.</p>

    return(
      <div className="container">
        <h1>Flight Information..!</h1>
        <hr/>
        <table className="table table-striped table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((singleFlight, index) => {
              const {cityFrom, cityTo, dTime, aTime, price} = singleFlight;
              return(
                <tr key={`sub-${index}`}>
                  <td>{cityFrom}</td>
                  <td>{cityTo}</td>
                  <td>{manageTime(dTime)}</td>
                  <td>{manageTime(aTime)}</td>
                  <td>{price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

function manageTime(time) {
  time = DateTime.fromMillis(time * 1000).toFormat('hh:mm');
  return time;
}
