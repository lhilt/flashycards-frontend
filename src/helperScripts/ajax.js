import axios from 'axios';
import getCookie from './getCSRF';

const authOptions = () => ({
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),
  }
});

const BASE_URL = process.env.REACT_APP_API_URL;

export const GET = (url) => {
  return axios.get(BASE_URL + url, authOptions());
};

export const POST = (url, data) => {
  return axios.post(BASE_URL + url, data, authOptions());
};

export const PUT = (url, update) => {
  return axios.put(BASE_URL + url, update, authOptions());
};

export const DELETE = (url) => {
  return axios.delete(BASE_URL + url, authOptions());
};
