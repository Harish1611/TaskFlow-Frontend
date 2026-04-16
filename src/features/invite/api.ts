import api from "../../services/api";

export const inviteUserAPI = (data: any) =>
  api.post("/invites", data);

export const acceptInviteAPI = (token: string) =>
  api.post(`/invites/accept/${token}`);