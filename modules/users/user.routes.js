import express from "express"
import * as controller from "./user.controller.js"
import authMiddleware from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get("/me", authMiddleware, controller.getMe)
router.patch("/me", authMiddleware, controller.updateProfile)

export default route