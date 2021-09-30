import axios from 'axios';
import { useCallback, useState, ChangeEvent, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { devServer, isProd, prodServer } from '../../../libs/constants';

axios.defaults.baseURL = isProd ? prodServer : devServer;
axios.defaults.withCredentials = true;

export default function useLogin() {
  const [password, setPassword] = useState('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onLogin = async (e: MouseEvent) => {
    try {
      const response = await axios.post('/auth/login', {
        password,
      });

      if (!response) return;

      document.location.href = '/';
    } catch (err) {
      toast.error(err);
    }
  };

  return {
    password,
    onChange,
    onLogin,
  };
}
