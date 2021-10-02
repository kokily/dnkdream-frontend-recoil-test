import { useRouter } from 'next/router';
import styled from 'styled-components';
import useAdmin from '../../libs/hooks/useAdmin';
import useListQuestions from './hooks/useListQuestions';

const Span = styled.span`
  font-size: 1rem;
  color: #0ea8b6;
`;

function ListQuestionsPage() {
  const router = useRouter();
  const { loading: meLoading, error } = useAdmin();
  const {
    data,
    loading,
    page,
    lastPage,
    title,
    name,
    email,
    onChange,
    confirm,
    onToggleConfirm,
    select,
    onChangeSelect,
    selectList,
  } = useListQuestions();

  if (loading) return <h3>Loading...</h3>;
  if (!loading && error) {
    router.push('/');
  }

  return (
    <div>
      <h2>
        ListQuestionsPage{' '}
        <Span>
          ({page}/{lastPage}페이지)
        </Span>
      </h2>

      <select onChange={onChangeSelect} value={select}>
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item === 'title' ? '제목' : item === 'name' ? '이름' : '이메일'}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListQuestionsPage;
