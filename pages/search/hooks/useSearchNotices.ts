import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import _concat from 'lodash/concat';
import { devServer, isProd, prodServer } from '../../../libs/constants';
import { SearchListNotices } from '../../../libs/store/searchNotices';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export default function useSearchNotices() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;

  const [page, setPage] = useState(1);

  // Recoil State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<NoticeType[]>([]);
  const notices = useRecoilValueLoadable(
    SearchListNotices({ page, title: id })
  );

  const onReadNotice = (id: string) => {
    router.push(`/notices/${id}`);
  };

  const onAddNotice = () => {
    router.push('/notices/add');
  };

  const onTag = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  const onMain = () => {
    router.push('/notices');
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
    onTag,
    search: id,
    onMain,
  };
}
