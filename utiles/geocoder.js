import NodeGeocoder from "node-geocoder"
import dotenv from "dotenv"
dotenv.config()


const geocoder = NodeGeocoder({
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: "https",
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null,
})

export default geocoder

// mapquest api
