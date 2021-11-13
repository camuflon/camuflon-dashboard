import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://camuflon-api.herokuapp.com/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getEmployerBoard() {
    return axios.get(API_URL + 'companies', { headers: authHeader() });
  }
}

export default new UserService();
