import supabase from "../../config/supabaseClient.js"
import { validateLicense } from "../drivers/driver.service.js"

export const create = async (trip) => {

  const { vehicle_id, driver_id, cargo_weight } = trip

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single()

  if (cargo_weight > vehicle.max_capacity)
    throw new Error("Cargo exceeds capacity")

  await validateLicense(driver_id)

  await supabase.from("trips").insert([{
    ...trip,
    state: "Dispatched"
  }])

  await supabase.from("vehicles")
    .update({ status: "On Trip" })
    .eq("id", vehicle_id)

  await supabase.from("drivers")
    .update({ status: "On Duty" })
    .eq("id", driver_id)

  return { message: "Trip created" }
}

export const complete = async (tripId, endOdometer) => {

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single()

  await supabase.from("trips")
    .update({
      state: "Completed",
      end_odometer: endOdometer
    })
    .eq("id", tripId)

  await supabase.from("vehicles")
    .update({ status: "Available", odometer: endOdometer })
    .eq("id", trip.vehicle_id)

  await supabase.from("drivers")
    .update({ status: "Off Duty" })
    .eq("id", trip.driver_id)

  return { message: "Trip completed" }
}