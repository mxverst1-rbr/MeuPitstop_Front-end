import api from "./api";
import {
  MaintenanceSchedule,
  CreateMaintenanceScheduleRequest,
  UpdateMaintenanceScheduleRequest,
  ApiResponse,
  PaginatedResponse,
} from "@/types/api";

export const maintenanceScheduleService = {

  async create(data: CreateMaintenanceScheduleRequest): Promise<ApiResponse<MaintenanceSchedule>> {
    const response = await api.post<ApiResponse<MaintenanceSchedule>>("/maintenanceSchedule", data);
    return response.data;
  },

  async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<MaintenanceSchedule>> {
    const response = await api.get<PaginatedResponse<MaintenanceSchedule>>("/maintenanceSchedule", {
      params: { page, perPage },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<MaintenanceSchedule>> {
    const response = await api.get<ApiResponse<MaintenanceSchedule>>(`/maintenanceSchedule/${id}`);
    return response.data;
  },

  async update(id: number, data: UpdateMaintenanceScheduleRequest): Promise<ApiResponse<MaintenanceSchedule>> {
    const response = await api.put<ApiResponse<MaintenanceSchedule>>(`/maintenanceSchedule/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/maintenanceSchedule/${id}`);
  },
};
