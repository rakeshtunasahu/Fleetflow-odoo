import * as service from "./vehicle.service.js"

export const getAll = async (req, res, next) => {
  try {
    const data = await service.getAllVehicles()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const result = await service.createVehicle(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const toggleRetire = async (req, res, next) => {
  try {
    const result = await service.toggleVehicleStatus(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}