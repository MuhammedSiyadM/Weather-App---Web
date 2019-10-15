let express = require('express');
const request = require('request');
const bodyParser = require('body-parser');  // a middleware
let app = express();
const PORT = process.env.PORT;

let apiKey = 'c4a254bb4ab159d56de569c4fd88e122';

app.use(bodyParser.urlencoded({ extended:true }));   // since it is a middleware
app.set('view engine', 'ejs'); //since it is a middleware
app.use(express.static('public'));  //To tell express to use these files.

app.get('/',function(req,res){   //To render embedded js page
  res.render('index',{weather:null,error:null});
})

app.post('/',function (req,res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, function(err, response, body) {
  if (err) {
     res.render('index',{weather:null,error:'Error'})
  }
  else {
     let weather = JSON.parse(body);
     if (weather.main == undefined) {
       res.render('index',{weather:null,error:'Try some real places'})
     }
     else{
       let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
       res.render('index',{weather:weatherText,error:null})
     }
  }
  });
})

app.listen(PORT,function(){   //To create server
   console.log('Example app listening on port 3000!');
})
