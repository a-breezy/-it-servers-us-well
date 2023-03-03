const express = require("express");
const app = express();

const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const apiKey = process.env.API_Auth;

// set options for axios to make cors request
const corsOptions = {
	method: "GET",
	headers: {
		accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET",
		Authorization: apiKey,
	},
};

app.use(
	cors({
		origin: "*",
	})
);

// app.get("/CORS/yelp", (req, res) => {
app.get(":endpoint([\\/\\w\\.-]*)", (req, res) => {
	console.log("the request obj is", req.query);
	// let location = req.params.location;
	console.log("the sent endpoint is", req.params.endpoint);

	let endpoint = "https://api.yelp.com/v3/" + req.originalUrl;
	console.log("final endpoint is", endpoint);
	// let queryParams = "businesses/search?location=" + "10024";
	// console.log(location);
	// let queryParams = "businesses/search?location=" + location;

	axios
		.get(endpoint, corsOptions)
		// .then((response) => console.log(response.data.businesses[0]))
		.then((response) => {
			// res.json(response.data)
			return response;
		})
		.catch(function (error) {
			// console.log(error);
		});

	res.send("CORS solved");
});

app.listen(PORT, () => {
	console.log(`CORS Server listening on port ${PORT}`);
});
