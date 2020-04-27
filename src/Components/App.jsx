import React from "react";
import {MySpinner} from "./Spinner.jsx";
import Flights from "./Flights.jsx";
import Dropdown from "./Dropdown.jsx";

import {fetchCities} from "../Api"
export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            error: false,
            isCheckboxOn: false,
            data: null,
            fly_from: null,
            fly_to: null,
            departure: "",
            arrival: "",
        }
    }

    onInputChange = async ({target: {value, name}}) => {  
        const shownCities = await fetchCities(value)
        this.setState({
            [name]: shownCities
        });
    }

    chooseDepartureCity = () => {
        const value = event.target.value;
        this.setState({fly_from: value});
    }

    chooseArrivalCity = () => {
        const value = event.target.value;
        this.setState({fly_to: value});
    }

    clickCheckBox = () => {
        this.setState({isCheckboxOn: !this.state.isCheckboxOn})
    }

    clickSearchButton = () => {
        const {fly_from, fly_to} = this.state;
        if(fly_from && fly_to) this.searchFlights();
        if(!fly_from || !fly_to) alert("Please choose both the destination and the arrival city")
    }

    async searchFlights() {
        this.setState({isLoading: true});
        const {fly_from, fly_to, isCheckboxOn} = this.state;
        await fetch(`https://api.skypicker.com/flights?fly_from=${fly_from}&fly_to=${fly_to}&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3`)
            .then(response => response.json())
            .then(data => {
                if(!isCheckboxOn) this.setState({data: data, isLoading: false})
                else {
                    const dataForDirectFlights = data.data.filter( eachFlight => {
                        if(eachFlight.route.length===1) return(eachFlight) 
                    })
                    data.data = dataForDirectFlights;
                    this.setState({data: data, isCheckboxOn: isCheckboxOn, isLoading: false})
                }
            })
            .catch(() => this.setState({error: true}));
    }

    render() {
        const {data, error, isLoading, isCheckboxOn, departure, arrival} = this.state;    
        
        return (
            /* 
            <SearchMenu />
            <Flights />
            */
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input type="text" placeholder="Departure City" name="departure" onChange={this.onInputChange}/>
                    <input type="text" placeholder="Arrival City" name="arrival" onChange={this.onInputChange}/>
                    <label><input type="checkbox" defaultChecked={isCheckboxOn} onChange={this.clickCheckBox} /> Only direct flights</label>
                    <button onClick={this.clickSearchButton}>Search..!</button>
                </div>

                {departure ? departure.locations.map((city, index) => <option 
                    key={index} 
                    name="fly_from" 
                    value={`${city.code}`} 
                    onClick={this.chooseDepartureCity}>
                        {city.name}
                    </option> 
                ) : undefined}

                {arrival ? arrival.locations.map((city, index) => <option 
                    key={index} 
                    name="fly_to" 
                    value={`${city.code}`} 
                    onClick={this.chooseArrivalCity}>
                        {city.name}
                    </option> 
                ) : undefined}


                {error ? "Error while fetching" : undefined}
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