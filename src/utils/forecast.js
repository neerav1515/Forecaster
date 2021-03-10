const request = require('request')

const forecast = (latitude, longitude, callback) => {
   // const url = 'https://api.darksky.net/forecast/1813b6d8bc976408a5f46b4e8ba7e560/' + latitude + ',' + longitude
    const url= 'http://api.weatherstack.com/current?access_key=d6844f05ad231d00f831db99238b5c58&query='+ latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' ,It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast