import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import qs from 'qs';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const TagNotices = atom<NoticeType[]>({
  key: 'TagNotices',
  default: [],
});

const _getNoticesTrigger = atom<number>({
  key: '_getTagNoticesTrigger',
  default: 0,
});

export const TagListNotices = selectorFamily<
  NoticeType[],
  { page?: number; tag: string }
>({
  key: 'TagListNotices',
  get:
    ({ page, tag }) =>
    async ({ get }) => {
      get(_getNoticesTrigger);

      const queryString = qs.stringify({ page, tag });
      const response = await axios.get(`/notices?${queryString}`);

      return response.data;
    },
  set:
    () =>
    ({ set }) => {
      set(_getNoticesTrigger, Math.random());
    },
});
