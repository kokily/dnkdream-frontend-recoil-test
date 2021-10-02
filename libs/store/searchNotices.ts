import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import qs from 'qs';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const SearchNotices = atom<NoticeType[]>({
  key: 'SearchNotices',
  default: [],
});

const _getSearchNoticesTrigger = atom<number>({
  key: '_getSearchNoticesTrigger',
  default: 0,
});

export const SearchListNotices = selectorFamily<
  NoticeType[],
  { page?: number; title: string }
>({
  key: 'SearchListNotices',
  get:
    ({ page, title }) =>
    async ({ get }) => {
      get(_getSearchNoticesTrigger);

      const queryString = qs.stringify({ page, title });
      const response = await axios.get(`/notices?${queryString}`);

      return response.data;
    },
  set:
    () =>
    ({ set }) => {
      set(_getSearchNoticesTrigger, Math.random());
    },
});
