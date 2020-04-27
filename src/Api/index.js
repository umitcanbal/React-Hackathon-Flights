import React from "react"

export const fetchCities = async (value) => {
  const url = `https://api.skypicker.com/locations?term=${value}&location_types=city`
  const cities = await fetch(url)
    .then(response => response.json())
    .then(data => data)
  
  return cities
}


