const express = require("express")
const path = require("path")
var hbs = require('hbs');
var geocode = require('../utils/geocode')
var forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../templates/public')

hbs.registerPartials(partialPath);

app.set('view engine','hbs')
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('weather');
})

app.get('/index',(req,res)=>{   
   res.render('index')
}) 

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({error:"Please provide a location"});
    }
    else
    {
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
           if(error)
           {
              return res.send({error});
           }
           forecast(latitude, longitude, (error, {temperature, summary})=>{
               if(error)
               {
                  return res.send({error})
               }
                res.json({
                   "temperature": temperature,
                   "summary":summary,
                   "location":location
               })
            })
        })
    }
})
app.get('/about',(req,res)=>{
    res.render('about',{
        "name":"Surya Senthilnathan",
        "text":"I have created this app for my initial learing of nodeJs.Please Try to use this app and FeedBacks are welcomed"
    })
})
app.listen(port,()=>{
    console.log("server is up and running")
})