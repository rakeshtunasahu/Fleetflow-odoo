import express from "express"
import * as controller from "./driver.controller.js"

const router = express.Router()

router.get("/", controller.getAll)
router.post("/", controller.create)
router.patch("/:id/status", controller.changeStatus)

export default router