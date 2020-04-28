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

    onInputChange = async ({ target: { value, name } }) => {
        const shownCities = await fetchCities(value)
        this.setState({ [name]: shownCities })

        this.state[name].locations.map(location => {
            if (location.code === value && name === "departure") {
                this.setState({ fly_from: value })
            }
            if (location.code === value && name === "arrival") {
                this.setState({ fly_to: value })
            }
        })
    }

    clickCheckBox = () => {
        this.setState({ isCheckboxOn: !this.state.isCheckboxOn })
    }

    clickSearchButton = () => {
        const { fly_from, fly_to } = this.state;
        if (fly_from && fly_to) this.searchFlights();
        if (!fly_from || !fly_to) alert("Please choose valid destination and arrival city")
    }

    async searchFlights() {
        const { fly_from, fly_to, isCheckboxOn } = this.state;
        this.setState({ isLoading: true });

        const fetchedFlightsData = await fetchFlights(fly_from, fly_to, isCheckboxOn)
        this.setState({ data: fetchedFlightsData, isCheckboxOn: isCheckboxOn, isLoading: false })
    }

    render() {
        const { data, isLoading, isCheckboxOn, departure, arrival } = this.state;

        return (
            <div>
                <SearchMenu 
                    onInputChange={this.onInputChange}
                    isCheckboxOn={isCheckboxOn}
                    clickCheckBox={this.clickCheckBox}
                    clickSearchButton={this.clickSearchButton}
                    departure={departure}
                    arrival={arrival}
                />

                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} isCheckboxOn={isCheckboxOn} /> : undefined}
            </div>
        )
    }
}