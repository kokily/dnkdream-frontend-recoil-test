import React from 'react';
import styled from 'styled-components';
import TagItem from './TagItem';

// Styles
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1.2rem;
`;

interface Props {
  tags: string[];
  onRemove: (tag: string) => void;
}

const TagsList = React.memo<Props>(({ tags, onRemove }) => (
  <Container>
    {tags.map((tag: string) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </Container>
));

export default TagsList;
