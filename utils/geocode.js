const request = require('request')

const geoCode = (address,callback)=>{
     const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia3J1ejE5OTciLCJhIjoiY2s2cDl5N3dtMHM0YjNucWJjdDV5bWNibyJ9.lmwxgz1p9CoWKuzb1rVMBQ"
     request({url:url,json:true},(error,response)=>{
         if(error)
         {
             callback("Unable to connect to services",undefined)
         }
         else if(response.body.features.length === 0)
         {
             callback("unable to find location",undefined)
         }
         else
         {
             callback(undefined,{
                 latitude: response.body.features[0].center[1],
                 longitude: response.body.features[0].center[0],
                 location: response.body.features[0].place_name
             })
         }
     })

}

module.exports = geoCode