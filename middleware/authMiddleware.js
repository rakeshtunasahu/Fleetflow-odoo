import supabase from "../config/supabaseClient.js"

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token)
      return res.status(401).json({ message: "Unauthorized" })

    const { data, error } =
      await supabase.auth.getUser(token)

    if (error)
      return res.status(401).json({ message: "Invalid token" })

    req.user = data.user
    next()
  } catch (err) {
    next(err)
  }
}