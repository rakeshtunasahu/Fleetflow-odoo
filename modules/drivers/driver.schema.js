export const validateDriver = (data) => {
  if (!data.name) throw new Error("Name is required")
  if (!data.license_number) throw new Error("License number is required")
  if (!data.license_category) throw new Error("License category is required")
  if (!data.license_expiry) throw new Error("License expiry is required")
}