import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValueLoadable } from 'recoil';
import { ReadNotice } from '../../../libs/store/notice';

export default function useReadNotice() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;

  // Recoil State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<NoticeType>(null);
  const notice = useRecoilValueLoadable<NoticeType>(ReadNotice(id));

  const onBack = () => {
    router.back();
  };

  const onRemove = async () => {
    if (window.confirm('정말 삭제하시나요?')) {
      try {
        const response = await axios.delete(`/notices/${id}`);

        if (!response) return;

        document.location.href = '/notices';
      } catch (err) {
        setError(err);
        toast.error(error);
      }
    } else {
      return;
    }
  };

  const onUpdate = () => {
    router.push(`/notices/edit/${id}`);
  };

  const onTag = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  useEffect(() => {
    switch (notice.state) {
      case 'loading':
        setLoading(true);
        break;
      case 'hasError':
        setError(notice.errorOrThrow);
        setLoading(false);
        break;
      case 'hasValue':
        setData(notice.contents);
        setLoading(false);
        break;
    }
  }, [notice]);

  return {
    data,
    loading,
    error,
    onBack,
    onRemove,
    onUpdate,
    onTag,
  };
}
