import axios from 'axios';

const API_URL = 'https://661c07d0e7b95ad7fa698cac.mockapi.io/api/v1/todo';

const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
