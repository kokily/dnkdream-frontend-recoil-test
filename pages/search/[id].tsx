import { GetServerSideProps } from 'next';
import axios from 'axios';
import styled from 'styled-components';
import { devServer, isProd, prodServer } from '../../libs/constants';
import { removeHtml } from '../../libs/utils';
import useSearchNotices from './hooks/useSearchNotices';

const Span = styled.span`
  font-size: 1rem;
  color: #777777;
  cursor: pointer;
  transition: 0.12s all;

  &:hover {
    color: red;
  }
`;

function SearchNoticesPage() {
  const {
    data,
    loading,
    error,
    onReadNotice,
    onAddNotice,
    onTag,
    search,
    onMain,
  } = useSearchNotices();

  if (loading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div>
      <button onClick={onAddNotice}>공지 작성</button>
      <h2>List Notices</h2>
      <h3>
        검색결과 <Span onClick={onMain}>{search}(x)</Span>
      </h3>

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

  const response = await axios.get<NoticeType[]>(
    `/notices?title=${encodeURI(id)}`
  );

  return {
    props: { notices: response.data },
  };
};

export default SearchNoticesPage;
