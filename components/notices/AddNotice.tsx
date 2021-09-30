import React from 'react';
import styled from 'styled-components';
import useTags from '../../libs/hooks/useTags';
import EditorTitle from '../editor/EditorTitle';
import EditorBody from '../editor/EditorBody';
import EditorFooter from '../editor/EditorFooter';
import AddTagBox from './tag/AddTagBox';
import ThumbnailBox from './thumbnail/ThumbnailBox';

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const EditorBox = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const TagBox = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  edit: boolean;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
  onChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeBody: (text: string) => void;
  onChangeTags: (nextTags: string[]) => void;
  onList: () => void;
  onThumbnail: () => void;
  onAddNotice: (e: React.MouseEvent) => void;
}

const AddNotice: React.FC<Props> = ({
  edit,
  title,
  body,
  thumbnail,
  tags,
  onChangeTitle,
  onChangeBody,
  onChangeTags,
  onList,
  onThumbnail,
  onAddNotice,
}) => {
  const addTag = useTags({ tags, onChangeTags });

  return (
    <Container>
      <EditorBox>
        <Wrapper>
          <EditorTitle
            placeholder="제목을 입력하세요"
            onChange={onChangeTitle}
            value={title}
          />

          <TagBox>
            <AddTagBox
              input={addTag.input}
              onAddTag={addTag.onAddTag}
              onChangeText={addTag.onChangeText}
              localTags={addTag.localTags}
              removeTag={addTag.removeTag}
            />
          </TagBox>

          <ThumbnailBox thumbnail={thumbnail} onThumbnail={onThumbnail} />

          <EditorBody edit={edit} QuillChange={onChangeBody} body={body} />
        </Wrapper>

        <EditorFooter onList={onList} onSubmit={onAddNotice} />
      </EditorBox>
    </Container>
  );
};

export default AddNotice;
