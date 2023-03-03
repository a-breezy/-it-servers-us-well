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

// use cors middleware to allow resource sharing
app.use(
	cors({
		origin: "*",
	})
);

// get yelp request and send response to frontend
app.get("/businesses/search", (req, res) => {
	let endpoint = "https://api.yelp.com/v3" + req.originalUrl;
	axios
		.get(endpoint, corsOptions)
		.then((response) => {
			data = response.data.businesses;
			res.send(data);
		})
		.catch(function (error) {
			console.log(error);
			res.send({ error });
		});
});

app.listen(PORT, () => {
	console.log(`CORS Server listening on port ${PORT}`);
});
