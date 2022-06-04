const axios = require("axios");
const baseURL = process.env.NODE_ENV === "production" ? "api" : "../api";
export default axios.create({
	withCredentials: true,
	baseURL,
	headers: {
		"Access-Control-Allow-Credentials": true,
		"Content-Type": "application/json",
	},
});
