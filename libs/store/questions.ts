import axios from 'axios';
import qs from 'qs';
import { atom, selectorFamily } from 'recoil';
import { devServer, isProd, prodServer } from '../constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export const Questions = atom<QuestionType[]>({
  key: 'Questions',
  default: [],
});

const _getQuestionsTrigger = atom<number>({
  key: '_getQuestionsTrigger',
  default: 0,
});

export const ListQuestions = selectorFamily<
  ListQuestionsType,
  {
    page?: number;
    title?: string;
    confirm?: boolean;
    name?: string;
    email?: string;
  }
>({
  key: 'ListQuestions',
  get:
    ({ page, title, confirm, name, email }) =>
    async ({ get }) => {
      get(_getQuestionsTrigger);

      const queryString = qs.stringify({ page, title, confirm, name, email });
      const response = await axios.get(`/questions?${queryString}`);

      return response.data;
    },
  set:
    () =>
    ({ set }) => {
      set(_getQuestionsTrigger, Math.random());
    },
});
