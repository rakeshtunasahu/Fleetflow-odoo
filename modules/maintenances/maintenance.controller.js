import * as service from "./maintenance.service.js"

export const create = async (req, res, next) => {
  try {
    const result = await service.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}