import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/api/tasks`, { withCredentials: true });
  return response.data;
};
export const fetchTasksByUserId = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/tasks/users/${userId}`, { withCredentials: true });
  return response.data;
};
export const addTask = async (task) => {
  const response = await axios.post(`${BASE_URL}/api/tasks`, task, { withCredentials: true });
  return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.patch(`${BASE_URL}/api/tasks/${taskId}`, updatedTask, { withCredentials: true });
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, { withCredentials: true });
};