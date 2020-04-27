import React from "react";
import { MySpinner } from "./Spinner.jsx";
import Flights from "./Flights.jsx";
import Dropdown from "./Dropdown.jsx";

import { fetchCities, fetchFlights } from "../Api"

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
        this.setState({ isLoading: true });
        const { fly_from, fly_to, isCheckboxOn } = this.state;

        const fetchedFlightsData = await fetchFlights(fly_from, fly_to, isCheckboxOn)
        this.setState({ data: fetchedFlightsData, isCheckboxOn: isCheckboxOn, isLoading: false })
    }

    render() {
        const { data, isLoading, isCheckboxOn, departure, arrival } = this.state;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type="text" placeholder="Departure City" name="departure" list="departure" onChange={this.onInputChange} />
                    <input type="text" placeholder="Arrival City" name="arrival" list="arrival" onChange={this.onInputChange} />
                    <label><input type="checkbox" defaultChecked={isCheckboxOn} onChange={this.clickCheckBox} /> Only direct flights</label>
                    <button onClick={this.clickSearchButton}>Search..!</button>
                </div>
                
                <datalist id="departure" >
                    {departure ? departure.locations.map((city, index) =>
                        <option
                            key={index}
                            value={`${city.code}`}
                        >
                            {city.name}
                        </option>
                    ) : undefined}
                </datalist>

                <datalist id="arrival" >
                    {arrival ? arrival.locations.map((city, index) =>
                        <option
                            key={index}
                            value={`${city.code}`}
                        >
                            {city.name}
                        </option>
                    ) : undefined}
                </datalist>

                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} isCheckboxOn={isCheckboxOn} /> : undefined}
            </div>
        )
    }

}





// const cities = 
// {
//     departureCities: 
//     [
//         {Prague: "PRG"},
//         {Berlin: "TXL"},
//         {Warsaw: "WAW"},
//         {Pardubice: "PED"},
//     ],
//     arrivalCities: 
//     [
//         {Valencia: "VLC"},
//         {Barcelona: "BCN"},
//         {Madrid: "MAD"},
//         {Milano: "MXP"},
//         {Athens: "ATH"},
//     ],
// }




// chooseCity = () => {
//     const value = event.target.innerText;

//     cities.departureCities.map( (city) => {
//         if(city[value]) this.setState({fly_from: city[value], city_from: value});
//     } )    
//     cities.arrivalCities.map( (city) => {
//         if(city[value]) this.setState({fly_to: city[value], city_to: value});
//     } ) 
// }


{/* <Dropdown dropdownTitle={city_from ? city_from : "Departure"} cities={departureCities} chooseCity={this.chooseCity} />
                    <Dropdown dropdownTitle={city_to ? city_to : "Arrival"} cities={arrivalCities} chooseCity={this.chooseCity} /> */}