import axios from 'axios';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useRecoilValueLoadable } from 'recoil';
import { devServer, isProd, prodServer } from '../../../libs/constants';
import { ReadNotice } from '../../../libs/store/notice';

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;

export default function useAddNotice(edit: boolean) {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const data = useRecoilValueLoadable(ReadNotice(id));

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeBody = useCallback((text: string) => {
    setBody(text);
  }, []);

  const onChangeTags = useCallback((nextTags: string[]) => {
    setTags(nextTags);
  }, []);

  const onList = () => {
    router.push('/notices');
  };

  const onThumbnail = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(
        `${isProd ? prodServer : devServer}/api/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response) {
        toast.error('이미지 업로드 에러');
        return;
      }

      const data = await response.json();

      setThumbnail(`https://image.dnkdream.com/${data.key}`);
    };

    upload.click();
  };

  const onAddNotice = async (e: MouseEvent) => {
    e.preventDefault();

    if ([title, body, tags].includes('')) {
      toast.error('빈 내용 없이 입력하세요');
      return;
    }

    try {
      let overlapTags =
        tags === [] ? [] : [...new Set(tags.map((tag) => tag.trim()))];

      if (!edit) {
        const response = await axios.post('/notices', {
          title,
          body,
          thumbnail,
          tags: overlapTags,
        });

        if (!response) {
          toast.error(response.statusText);
          return;
        }

        router.push('/notices');
      } else {
        const response = await axios.patch(`/notices/${id}`, {
          title,
          body,
          thumbnail,
          tags: overlapTags,
        });

        if (!response) {
          toast.error(response.statusText);
          return;
        }

        document.location.href = `/notices/${id}`;
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (data && data.state === 'hasValue') {
      setTitle(data.contents.title);
      setBody(data.contents.body);
      setThumbnail(data.contents.thumbnail);
      setTags(data.contents.tags);
    }
  }, [edit]);

  return {
    title,
    body,
    thumbnail,
    tags,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onThumbnail,
    onList,
    onAddNotice,
  };
}
