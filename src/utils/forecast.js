const request = require('request')
const forecast = (lat,lang,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c1fd029058bd4b9043e92838b496a7cd&query='+lat+','+lang
    request({url, json:true },(error,{body}) => {//url used property es6 shorthand
        if(error){
            callback("Something error occured.",undefined);
        }else if(body.error){
            callback("unable to find",undefined);
        }else{
            const res = body
            callback(undefined,res.current.weather_descriptions[0]+' & Current temperature is '+res.current.temperature+' but its feels like '+res.current.feelslike);
        }
    })
    
}

module.exports = forecast