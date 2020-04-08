import React from "react";
import {MySpinner} from "./Spinner.jsx";
import Flights from "./Flights.jsx";
import Dropdown from "./Dropdown.jsx";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            error: false,
            isCheckbox: false,
            data: null,
            fly_from: null,
            fly_to: null,
            city_from: null,
            city_to: null,
        }
    }

    chooseCity = () => {
        const value = event.target.innerText;
        
        cities.departureCities.map( (city) => {
            if(city[value]) this.setState({fly_from: city[value], city_from: value});
        } )    
        cities.arrivalCities.map( (city) => {
            if(city[value]) this.setState({fly_to: city[value], city_to: value});
        } ) 
    }

    clickCheckBox = () => {
        this.setState({isCheckbox: !this.state.isCheckbox})
    }

    clickSearchButton = () => {
        const {fly_from, fly_to} = this.state;
        if(fly_from && fly_to) this.searchFlights();
        if(!fly_from || !fly_to) alert("Please choose both the destination and the arrival city")
    }

    async searchFlights() {
        this.setState({isLoading: true});
        const {fly_from, fly_to, isCheckbox} = this.state;
        await fetch(`https://api.skypicker.com/flights?fly_from=${fly_from}&fly_to=${fly_to}&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3`)
            .then(response => response.json())
            .then(data => {
                if(!isCheckbox) this.setState({data: data, isLoading: false})
                else {
                    const dataForDirectFlights = data.data.filter( eachFlight => {
                        if(eachFlight.route.length===1) return(eachFlight) 
                    })
                    data.data = dataForDirectFlights;
                    this.setState({data: data, isLoading: false})
                }
            })
            .catch(() => this.setState({error: true}));
    }

    render() {
        const {data, error, isLoading, isCheckbox, city_from, city_to} = this.state;
        const {departureCities, arrivalCities} = cities;
        
        return (
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Dropdown dropdownTitle={city_from ? city_from : "Departure"} cities={departureCities} chooseCity={this.chooseCity} />
                    <Dropdown dropdownTitle={city_to ? city_to : "Arrival"} cities={arrivalCities} chooseCity={this.chooseCity} />
                    <button onClick={this.clickSearchButton}>Search..!</button>
                    
                    <label><input type="checkbox" defaultChecked={isCheckbox} onChange={this.clickCheckBox} /> Only direct flights</label>
                    {/* <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} /> */}
                </div>
                {error ? "Error while fetching" : undefined}
                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} /> : undefined}
            </div>
        )
    }

}

const cities = 
{
    departureCities: 
    [
        {Prague: "PRG"},
        {Berlin: "TXL"},
        {Warsaw: "WAW"},
        {Pardubice: "PED"},
    ],
    arrivalCities: 
    [
        {Valencia: "VLC"},
        {Barcelona: "BCN"},
        {Madrid: "MAD"},
        {Milano: "MXP"},
        {Athens: "ATH"},
    ],
}
