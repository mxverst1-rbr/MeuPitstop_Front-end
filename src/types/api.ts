export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface MechanicShop {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  registration_number: string;
  opening_hours: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceSchedule {
  id: number;
  user_id: number;
  mechanic_shop_id: number;
  vehicle_model: string;
  vehicle_plate: string;
  service_type: string;
  scheduled_date: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone_number?: string;
}

export interface CreateMechanicShopRequest {
  name: string;
  user_id: number;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  registration_number: string;
  opening_hours: string;
  rating?: number;
}

export interface UpdateMechanicShopRequest extends CreateMechanicShopRequest {
  id: number;
}

export interface CreateMaintenanceScheduleRequest {
  mechanic_shop_id: number;
  vehicle_model: string;
  vehicle_plate: string;
  service_type: string;
  scheduled_date: string;
  notes?: string;
}

export interface UpdateMaintenanceScheduleRequest extends CreateMaintenanceScheduleRequest {
  id: number;
}
