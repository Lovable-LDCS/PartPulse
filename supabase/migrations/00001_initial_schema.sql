-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Technician')),
  id_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create internal_transfers table
CREATE TABLE internal_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  technician_id UUID REFERENCES users(id) ON DELETE CASCADE,
  technician_name TEXT NOT NULL,
  ssid TEXT,
  psid TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  part_number TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  pdf_sent BOOLEAN DEFAULT FALSE,
  CONSTRAINT ssid_or_psid_required CHECK (
    (ssid IS NOT NULL AND psid IS NULL) OR 
    (ssid IS NULL AND psid IS NOT NULL)
  )
);

-- Create warranty_claims table
CREATE TABLE warranty_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  technician_id UUID REFERENCES users(id) ON DELETE CASCADE,
  technician_name TEXT NOT NULL,
  ssid TEXT NOT NULL,
  chiller_serial_number TEXT NOT NULL,
  chiller_model TEXT NOT NULL,
  building_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  part_number TEXT NOT NULL,
  failed_serial_number TEXT NOT NULL,
  repair_serial_number TEXT NOT NULL,
  date_of_failure DATE NOT NULL,
  date_of_repair DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  pdf_sent BOOLEAN DEFAULT FALSE
);

-- Create audit_log table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create app_settings table
CREATE TABLE app_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_internal_transfers_technician ON internal_transfers(technician_id);
CREATE INDEX idx_internal_transfers_date ON internal_transfers(date);
CREATE INDEX idx_internal_transfers_part_number ON internal_transfers(part_number);

CREATE INDEX idx_warranty_claims_technician ON warranty_claims(technician_id);
CREATE INDEX idx_warranty_claims_date ON warranty_claims(date);
CREATE INDEX idx_warranty_claims_part_number ON warranty_claims(part_number);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Admins can insert users" ON users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Admins can update users" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- RLS Policies for internal_transfers table
CREATE POLICY "Users can view their own transfers" ON internal_transfers
  FOR SELECT USING (technician_id = auth.uid());

CREATE POLICY "Admins can view all transfers" ON internal_transfers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Users can insert their own transfers" ON internal_transfers
  FOR INSERT WITH CHECK (technician_id = auth.uid());

CREATE POLICY "Admins can insert any transfer" ON internal_transfers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- RLS Policies for warranty_claims table
CREATE POLICY "Users can view their own claims" ON warranty_claims
  FOR SELECT USING (technician_id = auth.uid());

CREATE POLICY "Admins can view all claims" ON warranty_claims
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Users can insert their own claims" ON warranty_claims
  FOR INSERT WITH CHECK (technician_id = auth.uid());

CREATE POLICY "Admins can insert any claim" ON warranty_claims
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- RLS Policies for audit_log table
CREATE POLICY "Only admins can view audit log" ON audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "System can insert audit entries" ON audit_log
  FOR INSERT WITH CHECK (true);

-- RLS Policies for app_settings table
CREATE POLICY "Only admins can view settings" ON app_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Only admins can modify settings" ON app_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- Insert default admin users
INSERT INTO users (email, username, role) VALUES
  ('joline.kruger@tranetechnologies.com', 'joline.kruger', 'Admin'),
  ('johan.ras2@outlook.com', 'johan.ras', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default settings
INSERT INTO app_settings (key, value) VALUES
  ('notification_email', '{"primary": "", "secondary": ""}'),
  ('email_from', '{"address": "onboarding@resend.dev"}'),
  ('security_alert_recipients', '{"emails": ["joline.kruger@tranetechnologies.com", "johan.ras2@outlook.com"]}')
ON CONFLICT (key) DO NOTHING;
