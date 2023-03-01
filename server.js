const express = require("express");
const app = express();

const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// put api key into env variable
const apiKey = process.env.API_Auth;

// set options for axios to make cors request
const corsOptions = {
	// origin: "https://api.yelp.com/v3/businesses/search?location=10024",
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

app.get("/CORS/yelp", (req, res) => {
	let endpoint = "https://api.yelp.com/v3/";
	let queryParams = "businesses/search?location=" + "10024";

	axios
		.get(endpoint + queryParams, corsOptions)
		.then((response) => console.log(response.data.businesses[0]))
		.catch(function (error) {
			console.log(error);
		});

	res.send("CORS solved");
});

app.listen(PORT, () => {
	console.log(`CORS Server listening on port ${PORT}`);
});
