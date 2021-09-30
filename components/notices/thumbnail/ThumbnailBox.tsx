import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2.2rem;
  img {
    width: 100%;
    max-width: 650px;
    height: auto;
    filter: sepia(40%);
    border: 1px solid white;
    border-radius: 4px;
    padding: 5px;
  }
  button {
    color: #1fade6;
    border: 1px solid #1fade6;
    border-radius: 8px;
    background: none;
    padding: 0.3rem 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      background: #1fade6;
      color: white;
      border: 1px solid #10a9e6;
    }
    &:active {
      transform: translateY(2px);
    }
  }
`;

interface Props {
  thumbnail: string;
  onThumbnail: () => void;
}

const ThumbnailBox: React.FC<Props> = ({ thumbnail, onThumbnail }) => {
  return (
    <Container>
      {thumbnail ? (
        <img src={thumbnail} alt="Thumbnail" />
      ) : (
        <button onClick={onThumbnail}>썸네일 업로드</button>
      )}
    </Container>
  );
};

export default ThumbnailBox;
