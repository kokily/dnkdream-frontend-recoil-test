import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import _concat from 'lodash/concat';
import { devServer, isProd, prodServer } from '../../../libs/constants';
import { useRecoilValueLoadable } from 'recoil';
import { ListNotices } from '../../../libs/store/notices';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export default function useListNotices() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  // Recoil State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<NoticeType[]>([]);
  const notices = useRecoilValueLoadable(ListNotices({ page }));

  const onReadNotice = (id: string) => {
    router.push(`/notices/${id}`);
  };

  const onAddNotice = () => {
    router.push('/notices/add');
  };

  useEffect(() => {
    switch (notices.state) {
      case 'loading':
        setLoading(true);
        break;
      case 'hasError':
        setLoading(false);
        setError(notices.errorOrThrow);
        break;
      case 'hasValue':
        setLoading(false);
        setData(_concat(data, notices.contents));
        break;
    }
  }, [notices.contents]);

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
    onReadNotice,
    onAddNotice,
  };
}
