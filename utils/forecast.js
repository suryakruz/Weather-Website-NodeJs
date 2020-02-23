const request = require('request')

const forecast = (latitude,longitude,callback)=>{
     const url = "https://api.darksky.net/forecast/484b969652c5bb74a044cc8fa6922fc4/"+latitude+","+longitude+"?units=si";
     request({url:url,json:true},(error,response)=>{
         if(error)
         {
             callback("Unable to connect to services",undefined)
         }
         else
         {   
             callback(undefined,{
                 temperature: response.body.currently.temperature,
                 summary: response.body.daily.summary
             })
         }
     })

}
module.exports = forecast
