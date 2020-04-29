import React from "react";

import Flights from ".//Flights/Flights.jsx";
import SearchMenu from "./SearchMenu/SearchMenu.jsx";

import { fetchCities, fetchFlights } from "../Api"

import { MySpinner } from "./Spinner.jsx";

export default class App extends React.Component {

    state = {
        departure: "",
        arrival: "",
        fly_from: "",
        fly_to: "",
        date: "",
        isCheckboxOn: false,
        isLoading: false,
        data: "",
    }

    onInputChange = async ({ target: { value, id } }) => {
        const shownCities = await fetchCities(value)
        this.setState({ [id]: shownCities })
    }

    onInputSelect = ({cityCode, id}) => {
        if(id==="departure") this.setState({fly_from: cityCode})
        if(id==="arrival") this.setState({fly_to: cityCode})
    }

    onDateSelect = (date) => {
        this.setState({ date: date })
    }

    clickCheckBox = () => {
        this.setState({ isCheckboxOn: !this.state.isCheckboxOn })
    }

    clickSearchButton = () => {
        const { fly_from, fly_to, date } = this.state;
        (fly_from && fly_to) ? 
            date ? this.searchFlights() : alert("Please choose the date of your flight")
            : alert("Please choose valid destination and arrival city");
    }

    async searchFlights() {
        const { fly_from, fly_to, date, isCheckboxOn } = this.state;
        this.setState({ isLoading: true });
        const fetchedFlightsData = await fetchFlights(fly_from, fly_to, date, isCheckboxOn)        
        this.setState({ data: fetchedFlightsData, isLoading: false })
    }

    render() {
        const { data, isLoading, isCheckboxOn, departure, arrival } = this.state;

        return (
            <div style={{ display: "flex", flexDirection:"column", justifyContent: "space-around", alignItems: "center", height: "100vh", }}>
                <SearchMenu 
                    onInputChange={this.onInputChange}
                    departure={departure}
                    arrival={arrival}
                    onInputSelect={this.onInputSelect}
                    onDateSelect={this.onDateSelect}
                    clickCheckBox={this.clickCheckBox}
                    clickSearchButton={this.clickSearchButton}
                />
                <div style={{height: "65vh"}}>
                    {isLoading ? <MySpinner /> : undefined}
                    {data ? <Flights data={data.data} isCheckboxOn={isCheckboxOn} /> : undefined}
                </div>
            </div>
        )
    }
}