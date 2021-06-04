const request = require('request')


const geocode = (data,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+data+'.json?types=address&access_token=pk.eyJ1IjoicmFrZXNoMTExMSIsImEiOiJja3BkeWViNmgwMmt4MnBvNmI1NzBncGo2In0.XCvhHh-9FUv5Nh8bpO1ENg'
    request({url, json:true},(error,{body})=>{////used es6 property shorthand for response.object
    if(error){
        callback("Something error occured.",undefined);
    }else if(body.features.length === 0){
        callback("unable to find location.",undefined);
    }else{
        const lat = body.features[0].center[1]
        const long = body.features[0].center[0]
        const location = body.features[0].place_name
        callback(undefined,{lat,long,location});//used es6 property shorthand
        
    }
})
}

module.exports = geocode