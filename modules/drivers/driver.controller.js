import * as service from "./driver.service.js"
import { validateDriver } from "./driver.schema.js"

export const getAll = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    validateDriver(req.body)
    const result = await service.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const changeStatus = async (req, res, next) => {
  try {
    const result = await service.updateStatus(
      req.params.id,
      req.body.status
    )
    res.json(result)
  } catch (err) {
    next(err)
  }
}