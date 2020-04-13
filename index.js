require('dotenv').config();
const express = require ('express');
const app =  express();
const request = require('request');
const port =  process.env.PORT;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path  = require('path');
var city  = 'Dhaka';  
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56d44ba9f9eee9f3466034b56b07881c`;
app.use(express.static(path.join(__dirname,'views')));
 
app.set('view engine','pug');
app.set('views','./views');
app.use(morgan('dev'));  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',(req,res)=>{
    request(url,(error,response,body)=>{
        var weather_json = JSON.parse(body);
        console.log(weather_json);

        var weather  = { 
            city: city,
            temperature: Math.round(weather_json.main.temp),
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon,
        } 

        var weather_data =  {weather:weather};
        res.render('index',weather_data);
    });
});

app.get('/weather',(req,res)=>{
    city = req.query.city;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56d44ba9f9eee9f3466034b56b07881c`;
    res.redirect('/');
});

app.listen(port,()=>{
    console.log(`Listening to the ${port}......`);
})