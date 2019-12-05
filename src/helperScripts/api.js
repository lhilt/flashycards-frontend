import axios from 'axios';
import getCookie from './getCSRF';

class API {
  constructor() {
    this.AUTH_OPTIONS = {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      }
    }
  }

  static getToken() {
    return axios.get(
      `http://localhost:8000/token`,
      { withCredentials: true }
    );
  }

  static signUpUser(newUser) {
    return axios.post(
      `http://localhost:8000/signup`,
      newUser,
      this.AUTH_OPTIONS
    );
  }

  static signInUser(userInfo) {
    return axios.post(
      `http://localhost:8000/login`,
      userInfo,
      this.AUTH_OPTIONS
    );
  }
}

export default API;
