import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DragDrop from './DragDrop';
import { modules } from './config';
import { devServer, isProd, prodServer } from '../../libs/constants';
import { toast } from 'react-toastify';

// Styles
const Container = styled.div`
  top: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 650px;
  font-size: 1.125rem;
  margin-bottom: 5rem;
  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #777;
  }
  .ql-container {
    flex: 1 1 0%;
    min-height: 0px;
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 650px !important;
  }
  .ql-video {
    display: block;
    width: 100vw;
    height: 100vh;
    max-width: 650px;
    max-height: 480px;
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
    }
  }
`;

interface Props {
  edit: boolean;
  QuillChange: (text: string) => void;
  body: string;
}

const EditorBody: React.FC<Props> = ({ edit, QuillChange, body }) => {
  const Quill = typeof window === 'object' ? require('quill') : () => false;
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  const onClickImage = () => {
    const upload = document.createElement('input');

    upload.setAttribute('type', 'file');
    upload.setAttribute('accept', 'image/*');
    upload.click();

    upload.onchange = async function () {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(
        `${isProd ? prodServer : devServer}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      const range = quillInstance.current.getSelection(true);

      quillInstance.current.insertEmbed(
        range.index,
        'image',
        `https://image.dnkdream.com/${data.key}`
      );
      quillInstance.current.setSelection(range.index + 1);
    };
  };

  const onDragDropUpload = useCallback(async (file: File) => {
    try {
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch(
        `${isProd ? prodServer : devServer}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      const range = quillInstance.current.getSelection(true);

      quillInstance.current.insertEmbed(
        range.index,
        'image',
        `https://image.dnkdream.com/${data.key}`
      );
      quillInstance.current.setSelection(range.index + 1);
    } catch (err) {
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'snow',
        placeholder: '게시글 내용을 작성해 주세요',
        modules,
      });
    }

    const quill = quillInstance.current;

    quill.on('text-change', () => {
      QuillChange(quill.root.innerHTML);
    });

    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', onClickImage);
  }, []);

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;

    if (body) {
      mounted.current = true;
      quillInstance.current.root.innerHTML = body;
    }
  }, [body]);

  return (
    <>
      <Container>
        <div ref={quillElement} style={{ border: 'none' }} />
      </Container>
      <DragDrop onUpload={onDragDropUpload} />
    </>
  );
};

export default EditorBody;
