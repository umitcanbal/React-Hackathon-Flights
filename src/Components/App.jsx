import React from "react";
import {MySpinner} from "./Spinner.jsx"

export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            error: false
        }
    }

    async componentDidMount() {
        let fetchedData = null;
        fetchedData = await fetch("https://api.skypicker.com/flights?fly_from=PRG&fly_to=LGW&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3")
            .then(response => response.json())
            .then(data => (data))
            .catch(() => this.setState({error: true}));
        this.setState({isLoading: false})
    }

    render() {
        return (
            <div>
                {this.state.error ? "Error while fetching" : undefined}
                {this.state.isLoading ? <MySpinner /> : undefined}
                <h2>App Component</h2>
            </div>
        )
    }

}

// Aşağıdaki iki komutu da terminale yazmam gerekti, ikisi de şart
// npm install --save bootstrap
// npm install --save reactstrap react react-dom