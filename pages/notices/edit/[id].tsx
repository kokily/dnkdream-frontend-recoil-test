import { useRouter } from 'next/router';
import AddNotice from '../../../components/notices/AddNotice';
import useAdmin from '../../../libs/hooks/useAdmin';
import useAddNotice from '../hooks/useAddNotice';

function EditNoticePage() {
  const router = useRouter();
  const { loading, error } = useAdmin();
  const {
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
  } = useAddNotice(true);

  if (loading) return <div>Loading...</div>;
  if (!loading && error) {
    router.replace('/');
  }

  return (
    <AddNotice
      edit={true}
      title={title}
      body={body}
      thumbnail={thumbnail}
      tags={tags}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
      onChangeTags={onChangeTags}
      onThumbnail={onThumbnail}
      onList={onList}
      onAddNotice={onAddNotice}
    />
  );
}

export default EditNoticePage;
