import api from "./api";
import { User, ApiResponse } from "@/types/api";

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/user");
    return response.data;
  },

  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>(`/user/${id}`);
    return response.data;
  },
};
