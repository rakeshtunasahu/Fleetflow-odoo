import supabase from "../../config/supabaseClient.js"

export const getAll = async () => {
  const { data } = await supabase.from("drivers").select("*")
  return data
}

export const create = async (driver) => {
  return await supabase.from("drivers").insert([{
    ...driver,
    status: "Off Duty",
    safety_score: 100
  }])
}

export const updateStatus = async (id, status) => {
  return await supabase
    .from("drivers")
    .update({ status })
    .eq("id", id)
}

export const validateLicense = async (driverId) => {
  const { data } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", driverId)
    .single()

  const today = new Date().toISOString().split("T")[0]

  if (data.license_expiry < today)
    throw new Error("License expired")
}