import * as service from "./trip.service.js"

export const create = async (req, res, next) => {
  try {
    const result = await service.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const complete = async (req, res, next) => {
  try {
    const result = await service.complete(
      req.params.id,
      req.body.end_odometer
    )
    res.json(result)
  } catch (err) {
    next(err)
  }
}