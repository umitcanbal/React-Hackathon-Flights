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
            departure: "",
            arrival: "",
            departureCities: null,
            arrivalCities: null,
        }
    }

    onInputChange = async (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
        const departureOrArrival = `${event.target.name}Cities`;

        await fetch(`https://api.skypicker.com/locations?term=${value}&location_types=city`)
            .then(response => response.json())
            // .then(data => this.setState({[`${event.target.name}Cities`]: data}) )
            .then(data => this.setState({[`${departureOrArrival}`]: data}));
        console.log(this.state);
        // console.log(this.state.arrivalCities);
        // this.setState({event.target.name: fly_from});
        // this.setState({inputFieldValueForDeparture: value})
        // await fetch(`https://api.skypicker.com/locations?term=${value}&location_types=city`)
        //     .then(response => response.json())
        //     .then(data => this.setState({citiesForDeparture: data}) )
    }

    chooseDepartureCity = () => {
        
        const value = event.target.value;

        // console.log(value);
        // const selectedCity = this.state.citiesForDeparture.locations.find(city => {
        //     return city.name===value;
        // } );
        // const fly_from = selectedCity.code;
        this.setState({fly_from: value});
    }

    chooseArrivalCity = () => {
        const value = event.target.value;
    //     const selectedCity = this.state.citiesForArrival.locations.find(city => {
    //         return city.name===value;
    //     } );
    //     const fly_from = selectedCity.code;
        this.setState({fly_to: value});
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
                    this.setState({data: data, isCheckbox: isCheckbox, isLoading: false})
                }
            })
            .catch(() => this.setState({error: true}));
    }

    render() {
        const {data, error, isLoading, isCheckbox, city_from, city_to} = this.state;
        const {departureCities, arrivalCities} = this.state;
        // console.log("App -> render -> departureCities", departureCities)
        // console.log("App -> render -> arrivalCities", arrivalCities)
        
        
        
        
        return (
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button onClick={this.clickSearchButton}>Search..!</button>
                    <input type="text" placeholder="Departure City" name="departure" onChange={this.onInputChange}/>
                    <input type="text" placeholder="Arrival City" name="arrival" onChange={this.onInputChange}/>
                    <label><input type="checkbox" defaultChecked={isCheckbox} onChange={this.clickCheckBox} /> Only direct flights</label>
                </div>

                {this.state.departureCities!==null ? this.state.departureCities.locations.map((city, index) => {return <option key={index} name="fly_from" value={`${city.code}`} onClick={this.chooseDepartureCity}>{city.name}</option> }  ) : undefined}
                {this.state.arrivalCities!==null ? this.state.arrivalCities.locations.map((city, index) => {return <option key={index} name="fly_to" value={`${city.code}`} onClick={this.chooseArrivalCity}>{city.name}</option> }  ) : undefined}
                {/* {this.state.cities!==null ? this.state.cities.locations.map((city, index) => {return <li key={index}><a onClick={this.chooseArrivalCity}>{city.name}</a></li> }) : undefined} */}

                {error ? "Error while fetching" : undefined}
                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} isCheckbox={isCheckbox} /> : undefined}
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