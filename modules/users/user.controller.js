import * as service from "./user.service.js"

export const getMe = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.user.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const result = await service.updateUser(
      req.user.id,
      req.body
    )
    res.json(result)
  } catch (err) {
    next(err)
  }
}