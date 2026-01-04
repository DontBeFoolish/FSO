import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const createComment = async ({ id, content }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content });
  return response.data;
};

export default {
  setToken,
  token,
  getAll,
  getOne,
  create,
  update,
  remove,
  createComment,
};
