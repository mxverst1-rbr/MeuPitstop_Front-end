import api from "./api";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "@/types/api";

export const authService = {

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", credentials);
    
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    await api.post("/register", data);
  },

  async logout(): Promise<void> {
    try {
      await api.post("/logout");
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/user/myUser");
    return response.data;
  },


  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  },

  getToken(): string | null {
    return localStorage.getItem("access_token");
  },
};
