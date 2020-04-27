import React from "react"

export const fetchCities = async (value) => {
  const url = `https://api.skypicker.com/locations?term=${value}&location_types=city`
  const cities = await fetch(url)
    .then(response => response.json())
    .then(data => data)
  
  return cities
}

export const fetchFlights = async (fly_from, fly_to, isCheckboxOn) => {
  const url2 = `https://api.skypicker.com/flights?fly_from=${fly_from}&fly_to=${fly_to}&dateFrom=18/11/2020&dateTo=19/11/2020&partner=picky&v=3`
  const flightsData = await fetch(url2)
    .then(response => response.json())
    .then(data => {
        if(!isCheckboxOn) return data
        else {
            const dataForDirectFlights = data.data.filter( eachFlight => {
                if(eachFlight.route.length===1) return(eachFlight) 
            })
            data.data = dataForDirectFlights;
            return data
        }
    })
    .catch(() => alert("error while fetching flights"))
    return flightsData
}
