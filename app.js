const express = require("express");
const https = require("https"); // dont have to install it as it is native node module,used to get https request
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})
app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "8110fe9a9dc5c92ba19f99ecd4f35323";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    https.get(url, function (response) {
        //console.log(response);
        //console.log(response.statusCode) it gives the status code ,if its ok then 200, else 400
        response.on("data", function (data) {
            //console.log(data); //only give response on some data
            const weatherData = JSON.parse(data); //it converts the data into object
            //console.log(weatherData);

            const temp = weatherData.main.temp;//to only get temp info
            //console.log(temp);
            res.write("<h1>The temprature in " + query + " is " + temp + " degrees </h1>");

            const description = weatherData.weather[0].description; //to get description of weather(path)
            //console.log(description); 
            res.write("<h1>The weather is currently</h1> " + description)
            //res.write()is used to send multiple data.

            const icon = weatherData.weather[0].icon; //to get the icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //to take the icon image corresponding to weather 
            res.write("<img src=" + imageURL + ">");

            res.send()  //this res.send() sends all the res.write()
            // const object = {
            //    name: "Angela",
            //     favouriteFood: "Ramen"
            // }
            //console.log(JSON.stringify(object)); //it converts object to string
            //    })
            //  });
            //https.get(url) - it is used to send request to weather app API.

        })
    })

});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})