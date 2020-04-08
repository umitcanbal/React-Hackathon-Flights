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
              <th>Flight Duration</th>
              <th>Stopovers</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((singleFlight, index) => {
              const {cityFrom, cityTo, dTime, aTime, fly_duration, route, price} = singleFlight;
              const numberOfRoutes = route.length;
              return(
                <tr key={`sub-${index}`}>
                  <td>{cityFrom}</td>
                  <td>{cityTo}</td>
                  <td>{manageTime(dTime)}</td>
                  <td>{manageTime(aTime)}</td>
                  <td>{fly_duration}</td>
                  <td>{numberOfRoutes>1 ? route.map( (eachRoute, index) => { 
                    //the last item of "route" array always has the value of "cityTo" to the final destination, we dont want to show it in stopovers !
                    //excluding the one above, the last item of the "route" array we want to show should NOT have "/" as there is no following city !
                    if(index+2===numberOfRoutes) {
                      return <span key={index}>{eachRoute.cityTo}</span>
                    } else if(index+1<numberOfRoutes) {
                      return(<span key={index}>{eachRoute.cityTo + " / "}</span>)
                    } 
                  } )

                  : "-"}</td>               
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
