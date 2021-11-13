import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://camuflon-api.herokuapp.com/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCompaniesLocations() {
    let user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'companies/'+ user.company._id + '/locations', { headers: authHeader() });
  }
}

export default new UserService();
