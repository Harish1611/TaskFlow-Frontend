import api from "../../services/api";

export const getProjectsAPI = () => api.get("/projects");
export const createProjectAPI = (data: any) => api.post("/projects", data);
export const deleteProjectAPI = (id: string) => api.delete(`/projects/${id}`);