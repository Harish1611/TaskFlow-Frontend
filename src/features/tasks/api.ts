import api from "../../services/api";

export const getTasksAPI = (projectId: string) =>
  api.get(`/tasks/${projectId}`);

export const createTaskAPI = (data: any) => api.post("/tasks", data);

export const updateTaskAPI = (id: string, data: any) =>
  api.put(`/tasks/${id}`, data);

export const deleteTaskAPI = (id: string) =>
  api.delete(`/tasks/${id}`);