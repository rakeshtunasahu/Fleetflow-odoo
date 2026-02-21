import express from "express"
import * as service from "./analytic.service.js"

const router = express.Router()

router.get("/utilization", service.utilization)

export default router