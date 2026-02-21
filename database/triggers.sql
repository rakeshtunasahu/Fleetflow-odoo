-- =========================
-- TRIGGER: Set Vehicle In Shop
-- =========================

CREATE OR REPLACE FUNCTION set_vehicle_in_shop()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vehicles
  SET status = 'In Shop'
  WHERE license_plate = NEW.vehicle_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_vehicle_in_shop
AFTER INSERT ON maintenance_logs
FOR EACH ROW
EXECUTE FUNCTION set_vehicle_in_shop();