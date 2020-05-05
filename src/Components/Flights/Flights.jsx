import React from "react";

import FlightsTableRow from "./FlightsTableRow/FlightsTableRow.jsx"
import Pagination from "./Pagination/Pagination.jsx"

import styles from "./Flights.module.css"
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css"
import cx from "classnames"

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
    const { data, isCheckboxOn } = this.props;

    const numberOfPages = Math.ceil(data.length / 5);
    this.setState({ numberOfPages: numberOfPages, isCheckboxOn: isCheckboxOn })
  }

  componentDidUpdate(prevProps) {
    const { data, isCheckboxOn } = this.props;
    if (data !== prevProps.data) {
      const numberOfPages = Math.ceil(data.length / 5);
      this.setState({ numberOfPages: numberOfPages, currentPage: 1, isCheckboxOn: isCheckboxOn })
    }
  }

  changePage = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const { data } = this.props;
    const { currentPage, numberOfPages, isCheckboxOn } = this.state;

    if (!data.length) return <p>No {isCheckboxOn ? "direct" : ""} flight found for the selected route! Try something else.</p>
    const dataForChosenPage = data.filter((singleFlight, index) => {
      // for example if "currentPage" = 1; the conditions met when "index" is between 0 and 4, so the first 5 flights are returned ! 
      if (((currentPage - 1) * 5) <= index && index <= (currentPage * 5 - 1)) return singleFlight;
    })
    return (
      <div className={cx(globalStyles["container"], styles.container)}>

        <h2>Flight Information</h2>

        <div className={styles.container2}>

          <table className={cx(globalStyles["table"], globalStyles["table-striped"], globalStyles["table-bordered"], globalStyles["table-hover"], globalStyles["table-condensed"])}>

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

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} changePage={this.changePage} />

        </div>

      </div>
    )
  }
}

