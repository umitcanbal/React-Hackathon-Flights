import React from 'react'
import { DateTime } from 'luxon';

import styles from "./FlightsTableRow.module.css"

function FlightsTableRow({ singleFlight }) {

  const { cityFrom, cityTo, dTime, aTime, fly_duration, route, price } = singleFlight;
  const numberOfRoutes = route.length;

  return (
    <tr>
      <td>{cityFrom}</td>
      <td>{cityTo}</td>
      <td>{manageTime(dTime)}</td>
      <td>{manageTime(aTime)}</td>
      <td>{fly_duration}</td>
      <td>
        {numberOfRoutes > 1 ?
          route.map((eachRoute, index) => {
            //the last item of "route" array always has the value of "cityTo" to the final destination, we dont want to show it in stopovers !
            //excluding the one above, the last item of the "route" array we want to show should NOT have "/" as there is no following city !
            if (index + 2 === numberOfRoutes) {
              return <span key={index}>{eachRoute.cityTo}</span>
            } else if (index + 1 < numberOfRoutes) {
              return (<span key={index}>{eachRoute.cityTo + " / "}</span>)
            }
          })
          :
          "-"
        }
      </td>
      <td>{price}</td>
    </tr>
  )
}

export default FlightsTableRow

function manageTime(time) {
  time = DateTime.fromMillis(time * 1000).toFormat('hh:mm');
  return time;
}
