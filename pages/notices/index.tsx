import axios from 'axios';
import { GetServerSideProps } from 'next';
import { devServer, isProd, prodServer } from '../../libs/constants';
import { removeHtml } from '../../libs/utils';
import useListNotices from './hooks/useListNotices';

function ListNoticesPage() {
  const notices = useListNotices();

  if (notices.loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  if (notices.error) return null;

  return (
    <div>
      <h2>List Notices</h2>
      <button onClick={notices.onBack}>목록으로</button>

      <div>
        <input
          type="text"
          name="search"
          value={notices.search}
          onChange={notices.onChange}
          placeholder="제목을 검색하세요"
        />
        <button onClick={notices.onSearch}>검색</button>
      </div>

      {!notices.loading &&
        notices.data &&
        notices.data.map((notice) => (
          <div key={notice.id} style={{ border: '1px solid silver' }}>
            <h3
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => notices.onReadNotice(notice.id)}
            >
              {notice.title}
            </h3>
            <p>{removeHtml(notice.body.slice(0, 15))}...</p>
            <ul>
              {notice.tags.map((tag) => (
                <li
                  key={tag}
                  style={{ cursor: 'pointer', color: 'skyblue' }}
                  onClick={() => notices.onTag(tag)}
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
