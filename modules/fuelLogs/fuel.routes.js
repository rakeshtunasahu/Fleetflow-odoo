import express from "express"
import * as service from "./fuel.service.js"

const router = express.Router()

router.post("/", service.addFuel)

export default router