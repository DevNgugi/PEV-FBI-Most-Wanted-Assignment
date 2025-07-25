import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchWantedList(params = {}) {
  const res = await axios.get(`${BASE_URL}/wanted`, { params });
  return res.data;
}

export async function fetchPersonById(id) {
  const res = await axios.get(`${BASE_URL}/wanted/${id}`);
  return res.data;
}
