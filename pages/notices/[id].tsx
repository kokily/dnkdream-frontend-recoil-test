import axios from 'axios';
import { GetServerSideProps } from 'next';
import Markdown from '../../components/common/Markdown';
import { devServer, isProd, prodServer } from '../../libs/constants';
import useAdmin from '../../libs/hooks/useAdmin';
import useReadNotice from './hooks/useReadNotice';

function ReadNoticePage() {
  const { data: me, loading: meLoading } = useAdmin();
  const { data, loading, error, onBack, onRemove } = useReadNotice();

  if (loading || meLoading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div>
      <div>
        <button onClick={onBack}>목록으로</button>
        {me && (
          <>
            <button onClick={onRemove}>삭제하기</button>
          </>
        )}
      </div>

      <hr />

      {data && (
        <>
          <h3>{data.title}</h3>

          <ul>
            {data.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>

          {data.thumbnail && <img src={data.thumbnail} alt={data.title} />}

          <Markdown markdown={data.body} />
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.params;

  axios.defaults.baseURL = isProd ? prodServer : devServer;
  axios.defaults.withCredentials = true;

  const response = await axios.get(`/notices/${id}`);

  return {
    props: { notice: response.data },
  };
};

export default ReadNoticePage;
