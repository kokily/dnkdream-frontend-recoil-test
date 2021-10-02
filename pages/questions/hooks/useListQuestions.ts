import { useRouter } from 'next/router';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { ListQuestions } from '../../../libs/store/questions';

type StateProps = {
  title: string;
  name: string;
  email: string;
};

type ActionProps = {
  name: string;
  value: string;
};

const reducer = (state: StateProps, action: ActionProps) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

type SelectType = 'title' | 'name' | 'email';

export default function useListQuestions() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(reducer, {
    title: '',
    name: '',
    email: '',
  });
  const { title, name, email } = state;
  const [confirm, setConfirm] = useState<boolean | null>(null);
  const selectList: SelectType[] = ['title', 'name', 'email'];
  const [select, setSelect] = useState<'title' | 'name' | 'email'>('title');

  // Recoil State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<QuestionType[]>([]);
  const questions = useRecoilValueLoadable(
    ListQuestions({ page, title, name, email, confirm })
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  }, []);

  const onToggleConfirm = () => {
    setConfirm((prev) => !prev);
  };

  const onChangeSelect = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    switch (questions.state) {
      case 'loading':
        setLoading(true);
        break;
      case 'hasError':
        setLoading(false);
        setError(questions.errorOrThrow);
        break;
      case 'hasValue':
        setLoading(false);
        setData(questions.contents.questions);
        break;
    }
  }, [questions.contents]);

  return {
    data,
    loading,
    error,
    page,
    lastPage: questions.contents.lastPage,
    title,
    name,
    email,
    onChange,
    confirm,
    onToggleConfirm,
    select,
    onChangeSelect,
    selectList,
  };
}
