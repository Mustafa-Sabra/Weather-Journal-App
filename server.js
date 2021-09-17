// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const cors = require("cors");
app.use(cors());

/* Middleware*/
const bodyParser = require("body-parser");
const { Console } = require("console");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// store the port in a constant variable
const port = process.env.PORT || 3000;
const server = app.listen(port, myCallBackFunc);

// Callback to debug
function myCallBackFunc() {
    console.log("Server running on port", port)
}

// Get Route
app.get("/all", getData);

// Post Route
app.post("/all", postData);

// Callback function to complete GET '/all'
function getData(req, res) {
    res.send(projectData);
};

// post Route callback function 
function postData(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.send(projectData);
};