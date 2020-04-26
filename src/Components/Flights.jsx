import React from "react";
import { DateTime } from 'luxon';

export default class Flights extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      numberOfPages: null,
      isCheckbox: null,
    }
  }

  componentDidMount() {
    const {data, isCheckbox} = this.props;
    const numberOfPages = Math.ceil(data.length / 5);
    this.setState({numberOfPages: numberOfPages, isCheckbox: isCheckbox})
  }

  componentDidUpdate(prevProps) {
    const {data, isCheckbox} = this.props;
    if(data !== prevProps.data) {
      const numberOfPages = Math.ceil(data.length / 5);
      this.setState({numberOfPages: numberOfPages, currentPage: 1, isCheckbox: isCheckbox})
    }
  }

  changePage = () => {
    const value = event.target.innerText;
    value==="<" ? this.setState({currentPage: this.state.currentPage-1}) : this.setState({currentPage: this.state.currentPage+1})
  }

  render() {
    const {data} = this.props;
    const {currentPage, numberOfPages, isCheckbox} = this.state;
    
    if(!data.length) return <p>No {isCheckbox ? "direct" : ""} flight found for the selected route! Try something else.</p>
    const dataForChosenPage = data.filter( (singleFlight, index) => {
      // for example if "currentPage" = 1; the conditions met when "index" is between 0 and 4, so the first 5 flights are returned ! 
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
        {currentPage!==1 ? <button onClick={this.changePage}>{"<"}</button> : undefined }
        {currentPage!==numberOfPages ? <button onClick={this.changePage}>{">"}</button> : undefined }
      </div>
    )
  }
}

function manageTime(time) {
  time = DateTime.fromMillis(time * 1000).toFormat('hh:mm');
  return time;
}
