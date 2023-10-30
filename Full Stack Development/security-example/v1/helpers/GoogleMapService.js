const {
  Client,
  PlaceAutocompleteType,
} = require('@googlemaps/google-maps-services-js')
const client = new Client({})
const config = require('../../server-settings.json')
const googleMapService = {
  estimateDistance: async (origin, destination, units) => {
    let data = await client.directions({
      params: {
        units: units,
        origin: [origin.Latitude, origin.Longitude],
        destination: [destination.Latitude, destination.Longitude],
        key: config.server.GoogleAPIKey,
      },
    })

    if (data.data.routes.length == 0) return null

    const routes = data.data.routes[0]
    const distance = routes.legs[0].distance.value / 1609.344
    return distance
  },
  roads: async (origin, destination, units) => {
    let data = await client.directions({
      params: {
        units: units,
        origin: [origin.Latitude, origin.Longitude],
        destination: [destination.Latitude, destination.Longitude],
        key: config.server.GoogleAPIKey,
      },
    })

    if (data.data.routes.length == 0) return null

    // const routes = data.data.routes[0]
    // const distance = routes.legs[0].distance.value / 1609.344
    let result = data.data.routes.map((route) => {
      let obj = {
        route: route,
        distance: route.legs[0].distance.value / 1609.344,
      }
      return obj
    })
    return result
  },
  placesAutocomplete: async (search, location) => {
    let response = await client.placeAutocomplete({
      params: {
        components: ['country:us'],
        input: search,
        types: PlaceAutocompleteType.address,
        location: location,
        key: config.server.GoogleAPIKey,
      },
    })

    for (let prediction of response.data.predictions) {
      let geolocation = await client.placeDetails({
        params: {
          place_id: prediction.place_id,
          key: config.server.GoogleAPIKey,
        },
      })
      prediction.geolocation = geolocation.data.result.geometry.location
    }

    return response.data.predictions
  },
  placesAutocompleteTask: async (search) => {
    let response = await client.placeAutocomplete({
      params: {
        components: ['country:us'],
        input: search,
        types: PlaceAutocompleteType.address,
        key: config.server.GoogleAPIKey,
      },
    })

    for (let prediction of response.data.predictions) {
      let geolocation = await client.placeDetails({
        params: {
          place_id: prediction.place_id,
          key: config.server.GoogleAPIKey,
        },
      })
      prediction.geolocation = geolocation.data.result.geometry.location
    }

    return response.data.predictions
  },
}
module.exports = googleMapService
