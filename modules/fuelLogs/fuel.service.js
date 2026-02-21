import supabase from "../../config/supabaseClient.js"

export const addFuel = async (req, res, next) => {
  try {
    await supabase.from("fuel_logs").insert([req.body])
    res.json({ message: "Fuel logged" })
  } catch (err) {
    next(err)
  }
}