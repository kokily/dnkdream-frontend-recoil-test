import axios from 'axios';
import { atom } from 'recoil';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const Notices = atom<NoticeType[]>({
  key: 'Notices',
  default: [],
});
