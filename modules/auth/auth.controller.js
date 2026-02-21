import supabase from "../../config/supabaseClient.js"
import { createUserProfile } from "../users/user.service.js"

// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    })

    if (error) throw new Error(error.message)

    // Create user profile in custom users table
    if (data.user) {
      await createUserProfile(data.user)
    }

    res.json({
      message: "User registered successfully",
      user: data.user
    })

  } catch (err) {
    next(err)
  }
}


// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      })

    if (error) throw new Error(error.message)

    res.json({
      message: "Login successful",
      access_token: data.session.access_token,
      user: data.user
    })

  } catch (err) {
    next(err)
  }
}


// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password"
      })

    if (error) throw new Error(error.message)

    res.json({
      message: "Password reset link sent to email"
    })

  } catch (err) {
    next(err)
  }
}