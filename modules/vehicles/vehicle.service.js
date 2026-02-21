import supabase from "../../config/supabaseClient.js"

export const getAllVehicles = async () => {
  const { data } = await supabase.from("vehicles").select("*")
  return data
}

export const createVehicle = async (vehicle) => {
  const { data } = await supabase.from("vehicles").insert([{
    ...vehicle,
    status: "Available"
  }])
  return data
}

export const toggleVehicleStatus = async (id) => {

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("status")
    .eq("id", id)
    .single()

  const newStatus =
    vehicle.status === "Retired" ? "Available" : "Retired"

  await supabase
    .from("vehicles")
    .update({ status: newStatus })
    .eq("id", id)

  return { status: newStatus }
}