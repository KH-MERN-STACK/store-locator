import mongoose from "mongoose"
import geocoder from "../utiles/geocoder.js"

const StoreSchema = new mongoose.Schema({
	storeId: {
		type: String,
		required: [true, "Please add a store ID"],
		unique: true,
		trime: true,
		maxlength: [10, "Store ID must be no more than 10 characters"],
	},
	address: {
		type: String,
		required: [true, "Please add a address"],
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
		},
		coordinates: {
			type: [Number],
			index: "2dsphere",
		},
		formattedAddress: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

// Geocode & create location

StoreSchema.pre("save", async function (next) {
	const [loc] = await geocoder.geocode(this.address)
	this.location = {
		type: "Point",
		coordinates: [loc.longitude, loc.latitude],
		formattedAddress: loc.formattedAddress,
	}
	// DO not save address
	this.address = undefined
	next()
})

export default mongoose.model("Store", StoreSchema)
