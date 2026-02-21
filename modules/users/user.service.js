import supabase from "../../config/supabaseClient.js"

export const createUserProfile = async (user) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
      role: "Dispatcher"
    }])

  if (error) throw new Error(error.message)

  return data
}

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)

  return data
}

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select()

  if (error) throw new Error(error.message)

  return data
}