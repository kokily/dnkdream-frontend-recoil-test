import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import qs from 'qs';
import _concat from 'lodash/concat';
import { toast } from 'react-toastify';
import { devServer, isProd, prodServer } from '../../../libs/constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export default function useListNotices() {
  const router = useRouter();

  // Search
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);

  // Recoil State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<NoticeType[]>([]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      setTitle(search);
    }
  };

  const onTag = (tag: string) => {
    setTag(tag);
  };

  const onReadNotice = (id: string) => {
    router.push(`/notices/${id}`);
  };

  const onBack = () => {
    router.back();
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const queryString = qs.stringify({ title, tag, page });
      const response = await axios.get(`/notices?${queryString}`);

      setData(_concat(data, response.data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);

      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    // 얼마나 스크롤을 내렸는지
    const scrollY = window.scrollY;
    // 화면에 보이는 높이
    const clientHeight = document.documentElement.clientHeight;
    // Document 전체 길이
    const scrollHeight = document.documentElement.scrollHeight;

    function onScroll() {
      if (!loading) {
        if (scrollY + clientHeight > scrollHeight - 300) {
          setPage(page + 1);
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page]);

  return {
    data,
    loading,
    error,
    search,
    onChange,
    onSearch,
    onTag,
    onBack,
    onReadNotice,
  };
}
