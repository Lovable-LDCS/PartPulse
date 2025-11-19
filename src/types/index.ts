export type UserRole = 'Admin' | 'Technician';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  id_number?: string;
  created_at: string;
  updated_at: string;
}

export interface InternalTransfer {
  id: string;
  date: string;
  technician_id: string;
  technician_name: string;
  ssid?: string;
  psid?: string;
  po_number?: string;
  site_name?: string;
  quantity: number;
  part_number: string;
  description: string;
  created_at: string;
  pdf_sent: boolean;
}

export interface WarrantyClaim {
  id: string;
  date: string;
  technician_id: string;
  technician_name: string;
  ssid: string;
  chiller_serial_number: string;
  chiller_model: string;
  building_name: string;
  quantity: number;
  part_number: string;
  failed_serial_number: string;
  repair_serial_number: string;
  date_of_failure: string;
  date_of_repair: string;
  created_at: string;
  pdf_sent: boolean;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface AppSetting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
  updated_by: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => void;
}

export interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  resetSession: () => void;
}

export interface PreviewMode {
  mode: 'desktop' | 'mobile';
  setMode: (mode: 'desktop' | 'mobile') => void;
}

export const ADMIN_EMAILS = [
  'joline.kruger@tranetechnologies.com',
  'johan.ras2@outlook.com'
];
