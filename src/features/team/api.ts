import api from "../../services/api";

export const createTeamAPI = (data: any) =>
  api.post("/teams", data);

export const getTeamsAPI = () =>
  api.get("/teams");