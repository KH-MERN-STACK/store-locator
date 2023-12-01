import express from "express"
import { getStores, addStore } from "../controllers/stores.js"

const router = express.Router()

router.route("/").get(getStores).post(addStore)

export default router
