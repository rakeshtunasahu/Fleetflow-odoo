-- =========================
-- ENUM TYPES
-- =========================

CREATE TYPE vehicle_status AS ENUM (
  'Available',
  'On Trip',
  'In Shop',
  'Retired'
);

CREATE TYPE trip_status AS ENUM (
  'Draft',
  'Dispatched',
  'Complete',
  'Cancelled'
);

CREATE TYPE driver_status AS ENUM (
  'On Duty',
  'On Trip',
  'Off Duty',
  'Suspended'
);

-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- =========================
-- VEHICLES TABLE


CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid(),
  license_plate TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  max_capacity NUMERIC NOT NULL,
  odometer NUMERIC,
  acquisition_cost NUMERIC,
  status vehicle_status DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT now()
);

-- =========================
-- DRIVERS TABLE
-- =========================

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_expiry DATE,
  safety_score NUMERIC,
  status driver_status DEFAULT 'On Duty',
  created_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TRIPS TABLE
-- =========================

CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id TEXT REFERENCES vehicles(license_plate),
  cargo_weight NUMERIC NOT NULL,
  status trip_status DEFAULT 'Draft',
  created_at TIMESTAMP DEFAULT now()
);

-- =========================
-- FUEL LOGS TABLE
-- =========================

CREATE TABLE fuel_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  liters NUMERIC NOT NULL,
  cost NUMERIC NOT NULL,
  log_date DATE NOT NULL,
  vehicle_id TEXT REFERENCES vehicles(license_plate),
  created_at TIMESTAMP DEFAULT now()
);

-- =========================
-- MAINTENANCE LOGS TABLE
-- =========================

CREATE TABLE maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id TEXT REFERENCES vehicles(license_plate),
  description TEXT NOT NULL,
  cost NUMERIC NOT NULL,
  service_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);



alter table vehicles
add column if not exists odometer numeric default 0;

alter table vehicles
add column if not exists status text default 'Available';