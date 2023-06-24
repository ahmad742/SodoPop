import axios from 'axios';
import {store} from '../redux/index'
// import { showErrorMsg } from '../utils'
//https://demo.appcrates.net/shoutout_latest/public/admin/login
const ROOT_URL = 'https://demo.appcrates.net/date_closet_latest/public'; // staging server
const IMAGE_URL = 'https://demo.appcrates.net/date_closet_latest/public/assets/editprofile/'
const POLLS_URL = 'https://demo.appcrates.net/date_closet_latest/public/uploads/'
const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const { token } = store?.getState().userSession;
    // console.log('url ',requestConfig.url)
    if (token) {
      requestConfig.headers = {
        'Authorization': `Bearer ${token}`,
      };
    }
    return requestConfig;
  },
  (err) => {
    // showErrorMsg(err);
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
  IMAGE_URL,
  POLLS_URL
};
