import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import qs from 'qs';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const Notices = atom<NoticeType[]>({
  key: 'Notices',
  default: [],
});

const _getNoticesTrigger = atom<number>({
  key: '_getNoticesTrigger',
  default: 0,
});

export const ListNotices = selectorFamily<NoticeType[], { page?: number }>({
  key: 'ListNotices',
  get:
    ({ page }) =>
    async ({ get }) => {
      get(_getNoticesTrigger);

      const queryString = qs.stringify({ page });
      const response = await axios.get(`/notices?${queryString}`);

      return response.data;
    },
  set:
    () =>
    ({ set }) => {
      set(_getNoticesTrigger, Math.random());
    },
});
