const axios = require("axios");
const baseURL = process.env.NODE_ENV === "production" ? "api" : "http://10.0.0.5:5555/api";
export default axios.create({
	baseURL,
});
