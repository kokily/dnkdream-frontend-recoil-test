import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const style = css`
  display: block;
  padding: 0;
  font-size: 2.75rem;
  font-family: '윤고딕';
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: #535353;
  margin-bottom: 1rem;
  overflow: hidden;
  &::placeholder {
    color: #c3c3c3;
  }
  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Title = styled(TextareaAutosize)`
  ${style}
`;

export default Title;
