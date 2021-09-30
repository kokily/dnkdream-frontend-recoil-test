import axios from 'axios';
import { atom, selector } from 'recoil';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const meState = atom<string | null>({
  key: 'Me',
  default: null,
});

export const getMe = selector({
  key: 'GetMe',
  get: async () => {
    const res = await axios.get('/auth/me');

    return res.data;
  },
});
