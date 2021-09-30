import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

export const Notice = atom<NoticeType>({
  key: 'Notice',
  default: null,
});

// Args Types (Return Type, Arg)
export const ReadNotice = selectorFamily<NoticeType, string>({
  key: 'ReadNotice',
  get: (id) => async () => {
    const response = await axios.get(`/notices/${id}`);

    return response.data;
  },
});
