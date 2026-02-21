export const validateVehicle = (data) => {
  if (!data.name || !data.license_plate || !data.max_capacity)
    throw new Error("Missing required vehicle fields")
}