import React from 'react';

export default class App extends React.Component {

    constructor(props) {
        super(props); 
    }

    async componentDidMount() {
        let fetchedData = null;
        fetchedData = await fetch("https://api.skypicker.com/flights?fly_from=PRG&fly_to=LGW&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3")
            .then(response => response.json())
            .then(data => (data));
    }

    render() {
        return (
            <h2>App Component</h2>
        )
    }

}