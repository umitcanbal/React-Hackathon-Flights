import React from "react";

import Flights from ".//Flights/Flights.jsx";
import SearchMenu from "./SearchMenu/SearchMenu.jsx";

import { fetchCities, fetchFlights } from "../Api"

import { MySpinner } from "./Spinner.jsx";

export default class App extends React.Component {

    state = {
        isLoading: false,
        isCheckboxOn: false,
        data: "",
        fly_from: "",
        fly_to: "",
        departure: "",
        arrival: "",
    }

    onInputChange = async ({ target: { value, id } }) => {
        const shownCities = await fetchCities(value)
        this.setState({ [id]: shownCities })
    }

    onInputSelect = ({cityCode, id}) => {
        if(id==="departure") this.setState({fly_from: cityCode})
        if(id==="arrival") this.setState({fly_to: cityCode})
    }

    clickCheckBox = () => {
        this.setState({ isCheckboxOn: !this.state.isCheckboxOn })
    }

    clickSearchButton = () => {
        const { fly_from, fly_to } = this.state;
        (fly_from && fly_to) ? this.searchFlights() : alert("Please choose valid destination and arrival city");
    }

    async searchFlights() {
        const { fly_from, fly_to, isCheckboxOn } = this.state;
        this.setState({ isLoading: true });

        const fetchedFlightsData = await fetchFlights(fly_from, fly_to, isCheckboxOn)
        this.setState({ data: fetchedFlightsData, isLoading: false })
    }

    render() {
        const { data, isLoading, isCheckboxOn, departure, arrival } = this.state;

        return (
            <div>
                <SearchMenu 
                    onInputChange={this.onInputChange}
                    departure={departure}
                    arrival={arrival}
                    onInputSelect={this.onInputSelect}
                    clickCheckBox={this.clickCheckBox}
                    clickSearchButton={this.clickSearchButton}
                />

                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} isCheckboxOn={isCheckboxOn} /> : undefined}
            </div>
        )
    }
}