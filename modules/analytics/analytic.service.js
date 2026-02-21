import supabase from "../../config/supabaseClient.js"

export const utilization = async (req, res, next) => {
  try {
    const { data: total } = await supabase.from("vehicles").select("*")
    const { data: active } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "On Trip")

    res.json({
      utilization: (active.length / total.length) * 100
    })
  } catch (err) {
    next(err)
  }
}