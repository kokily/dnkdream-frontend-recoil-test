import axios from 'axios';
import { GetServerSideProps } from 'next';
import { devServer, isProd, prodServer } from '../../libs/constants';
import { removeHtml } from '../../libs/utils';
import useTagListNotices from './hooks/useTagListNotices';

function TagListNotices() {
  const { data, loading, error, onReadNotice, onAddNotice, onTag } =
    useTagListNotices();

  if (loading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div>
      <button onClick={onAddNotice}>공지 작성</button>
      <h2>List Notices</h2>

      {!loading &&
        data &&
        data.map((notice) => (
          <div key={notice.id} style={{ border: '1px solid silver' }}>
            <h3
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => onReadNotice(notice.id)}
            >
              {notice.title}
            </h3>
            <p>
              {notice.body.length > 25
                ? `${removeHtml(notice.body.slice(0, 25))}...`
                : removeHtml(notice.body)}
            </p>
            <ul>
              {notice.tags.map((tag) => (
                <li
                  key={tag}
                  onClick={() => onTag(tag)}
                  style={{ cursor: 'pointer', color: 'skyblue' }}
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.params;

  axios.defaults.baseURL = isProd ? prodServer : devServer;
  axios.defaults.withCredentials = true;

  const res = await axios.get<NoticeType[]>(`/notices?tag=${encodeURI(id)}`);

  return {
    props: {
      notices: res ? res.data : [],
    },
  };
};

export default TagListNotices;
