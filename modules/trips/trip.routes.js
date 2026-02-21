import express from "express"
import * as controller from "./trip.controller.js"

const router = express.Router()

router.post("/", controller.create)
router.patch("/:id/complete", controller.complete)

export default router