import supabase from "../../config/supabaseClient.js"

export const create = async (record) => {

  await supabase.from("maintenance").insert([record])

  await supabase.from("vehicles")
    .update({ status: "In Shop" })
    .eq("id", record.vehicle_id)

  return { message: "Maintenance added" }
}