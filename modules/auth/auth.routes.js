import express from "express"
import * as controller from "./auth.controller.js"

const router = express.Router()

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/forgot-password", controller.forgotPassword)

export default router