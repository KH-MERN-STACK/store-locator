// @desc Get all stores
// @route GET /api/v1/stores
// @access public
import Store from "../models/Store.js"

export const getStores = async (req, res, next) => {
	try {
		const stores = await Store.find({})
		return res
			.status(200)
			.json({ success: true, count: stores.length, data: stores })
	} catch (err) {
		console.log(500).json({ error: `Server error` })
	}

	res.send("hello")
}

export const addStore = async (req, res, next) => {
	try {
		const newStore = await Store.create(req.body)
		res.status(200).json({ success: true, data: newStore })
	} catch (err) {
		console.log(err)
		if (err.code === 11000)
			return res.status(400).json({ error: `This store is already exists` })
		res.status(500).json({ error: `server error` })
	}
}
