import React from "react";
import { DateTime } from 'luxon';

export default class Flights extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      numberOfPages: null,
    }
  }

  componentDidMount() {
    const {data} = this.props;
    const numberOfPages = Math.ceil(data.length / 5);
    this.setState({numberOfPages: numberOfPages})
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props;
    if(data !== prevProps.data) {
      const numberOfPages = Math.ceil(data.length / 5);
      this.setState({numberOfPages: numberOfPages, currentPage: 1})
    }
  }

  previousPage = () => {
    this.setState({currentPage: this.state.currentPage-1})
  }

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage+1})
  }

  render() {
    const {data} = this.props;
    const {currentPage, numberOfPages} = this.state;
    console.log("data", data);
    console.log("currentPage", currentPage);
    console.log("numberOfPages", numberOfPages);
    if(!data.length) return <p>No flight found for the selected route! Try something else.</p>
    const dataForChosenPage = data.filter( (singleFlight, index) => {
      if(((currentPage-1)*5)<=index && index<=(currentPage*5-1)) return singleFlight;
    } )
    return(
      <div className="container">
        <h1>Flight Information..!</h1>
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
            {dataForChosenPage.map((singleFlight, index) => {
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
        {currentPage!==1 ? <button onClick={this.previousPage}>{"<"}</button> : undefined }
        {currentPage!==numberOfPages ? <button onClick={this.nextPage}>{">"}</button> : undefined }
      </div>
    )
  }
}

function manageTime(time) {
  time = DateTime.fromMillis(time * 1000).toFormat('hh:mm');
  return time;
}
