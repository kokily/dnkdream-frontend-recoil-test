import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValueLoadable } from 'recoil';
import { devServer, isProd, prodServer } from '../constants';
import { getMe } from '../store/auth';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export default function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const admin = useRecoilValueLoadable(getMe);

  const onLogout = async () => {
    try {
      await axios.post('/auth/logout');

      document.location.href = '/';
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    switch (admin.state) {
      case 'loading':
        setLoading(true);
        break;
      case 'hasError':
        setLoading(false);
        setError('로그인이 필요합니다');
        break;
      case 'hasValue':
        setLoading(false);
        break;
    }
  });

  return {
    data: admin,
    loading,
    error,
    onLogout,
  };
}
