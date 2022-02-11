const axios = require("axios");
const baseURL = process.env.NODE_ENV === "production" ? "api" : "http://localhost:5555/api";
export default axios.create({
	withCredentials: true,
	baseURL,
	headers: {
		"Access-Control-Allow-Credentials": true,
		"Content-Type": "application/json",
	},
});
