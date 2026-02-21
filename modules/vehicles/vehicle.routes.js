import express from "express"
import * as controller from "./vehicle.controller.js"
import authMiddleware from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", controller.getAll)
router.post("/", authMiddleware, controller.create)
router.patch("/:id/retire", authMiddleware, controller.toggleRetire)

export default router