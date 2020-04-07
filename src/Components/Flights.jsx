import React from "react";
import { DateTime } from 'luxon';

export default class Flights extends React.Component {
  render() {
    const {data} = this.props;

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
              return(
                <tr key={`sub-${index}`}>
                  <td>{singleFlight.cityFrom}</td>
                  <td>{singleFlight.cityTo}</td>
                  <td>{manageTime(singleFlight.dTime)}</td>
                  <td>{manageTime(singleFlight.aTime)}</td>
                  <td>{singleFlight.price}</td>
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

//Aşağıdakini yapmak zorunda kaldım zamanları düzgünce gösterebilmek için
// npm install --save luxon