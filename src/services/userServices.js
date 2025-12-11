import http from "@/utils/http";

export const mute = async (userId) => {
  const response = await http.post(`users/${userId}/mute`);
  return response.data;
};
export const unmute = async (userId) => {
  const response = await http.post(`users/${userId}/unmute`);
  return response.data;
};
export const restrict = async (userId) => {
  const response = await http.post(`users/${userId}/restrict`);
  return response.data;
};
export const unrestrict = async (userId) => {
  const response = await http.post(`users/${userId}/unrestrict`);
  return response.data;
};
export const block = async (userId) => {
  const response = await http.post(`users/${userId}/block`);
  return response.data;
};
export const unblock = async (userId) => {
  const response = await http.post(`users/${userId}/unblock`);
  return response.data;
};
