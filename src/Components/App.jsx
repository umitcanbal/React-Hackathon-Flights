import React from "react";
import {MySpinner} from "./Spinner.jsx"
import Flights from "./Flights.jsx"


export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            error: false,
            data: null,
        }
    }

    async componentDidMount() {
        await fetch("https://api.skypicker.com/flights?fly_from=PRG&fly_to=LGW&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3")
            .then(response => response.json())
            .then(data => this.setState({data: data, isLoading: false}))
            .catch(() => this.setState({error: true}));
    }

    render() {
        const {data, error, isLoading} = this.state;
        
        return (
            <div>
                {error ? "Error while fetching" : undefined}
                {isLoading ? <MySpinner /> : undefined}
                {data ? <Flights data={data.data} /> : undefined}
            </div>
        )
    }

}
