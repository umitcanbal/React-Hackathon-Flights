import React from "react";

import FlightsTableRow from "./FlightsTableRow/FlightsTableRow.jsx"

export default class Flights extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      numberOfPages: null,
      isCheckboxOn: null,
    }
  }

  componentDidMount() {
    const {data, isCheckboxOn} = this.props;
    console.log("Flights -> componentDidMount -> data", data)
    
    const numberOfPages = Math.ceil(data.length / 5);
    this.setState({numberOfPages: numberOfPages, isCheckboxOn: isCheckboxOn})
  }

  componentDidUpdate(prevProps) {
    const {data, isCheckboxOn} = this.props;
    if(data !== prevProps.data) {
      const numberOfPages = Math.ceil(data.length / 5);
      this.setState({numberOfPages: numberOfPages, currentPage: 1, isCheckboxOn: isCheckboxOn})
    }
  }

  changePage = () => {
    const value = event.target.innerText;
    value==="<" ? this.setState({currentPage: this.state.currentPage-1}) : this.setState({currentPage: this.state.currentPage+1})
  }

  render() {
    const {data} = this.props;
    const {currentPage, numberOfPages, isCheckboxOn} = this.state;
    
    if(!data.length) return <p>No {isCheckboxOn ? "direct" : ""} flight found for the selected route! Try something else.</p>
    const dataForChosenPage = data.filter( (singleFlight, index) => {
      // for example if "currentPage" = 1; the conditions met when "index" is between 0 and 4, so the first 5 flights are returned ! 
      if(((currentPage-1)*5)<=index && index<=(currentPage*5-1)) return singleFlight;
    } )
    return(
      <div className="container" style={{display: "flex", flexDirection: "column", justfiyContent: "flex-start", alignItems: "center"}}>
        <h1>Flight Information</h1>
        <div style={{display: "flex", flexDirection: "column", justfiyContent: "center", alignItems: "center"}}>
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
                return <FlightsTableRow 
                  singleFlight={singleFlight}
                  key={index}
                />
              })}
            </tbody>
          </table>

          {currentPage!==1 ? <button onClick={this.changePage}>{"<"}</button> : undefined }
          {currentPage!==numberOfPages ? <button onClick={this.changePage}>{">"}</button> : undefined }
        </div>
      </div>
    )
  }
}

