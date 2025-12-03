import api from "./api";
import {
  MechanicShop,
  CreateMechanicShopRequest,
  UpdateMechanicShopRequest,
  ApiResponse,
  PaginatedResponse,
} from "@/types/api";

export const mechanicShopsService = {

  async create(data: CreateMechanicShopRequest): Promise<ApiResponse<MechanicShop>> {
    const response = await api.post<ApiResponse<MechanicShop>>("/mechanicShops", data);
    return response.data;
  },

  async getAll(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<MechanicShop>> {
    const response = await api.get<PaginatedResponse<MechanicShop>>("/mechanicShops", {
      params: { page, perPage },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<MechanicShop>> {
    const response = await api.get<ApiResponse<MechanicShop>>(`/mechanicShops/${id}`);
    return response.data;
  },

  async update(id: number, data: UpdateMechanicShopRequest): Promise<ApiResponse<MechanicShop>> {
    const response = await api.put<ApiResponse<MechanicShop>>(`/mechanicShops/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/mechanicShops/${id}`);
  },
};
