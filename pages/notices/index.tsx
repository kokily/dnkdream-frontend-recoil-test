import axios from 'axios';
import { GetServerSideProps } from 'next';
import { devServer, isProd, prodServer } from '../../libs/constants';
import { removeHtml } from '../../libs/utils';
import useListNotices from './hooks/useListNotices';

function ListNoticesPage() {
  const {
    data,
    loading,
    error,
    onReadNotice,
    onAddNotice,
    onTag,
    search,
    onChange,
    onSearch,
  } = useListNotices();

  if (loading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div>
      <button onClick={onAddNotice}>공지 작성</button>
      <h2>List Notices</h2>

      <div style={{ marginBottom: '1rem' }}>
        <span style={{ marginRight: '0.5rem' }}>검 색</span>
        <input type="text" name="search" value={search} onChange={onChange} />
        <button onClick={onSearch}>검색하기</button>
      </div>

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

export const getServerSideProps: GetServerSideProps = async () => {
  axios.defaults.baseURL = isProd ? prodServer : devServer;
  axios.defaults.withCredentials = true;

  const res = await axios.get<NoticeType[]>('/notices');

  return {
    props: {
      notices: res.data,
    },
  };
};

export default ListNoticesPage;
