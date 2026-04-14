import api from "../../services/api";

export const loginAPI = (data: any) => api.post("/auth/login", data);
export const registerAPI = (data: any) => api.post("/auth/register", data);