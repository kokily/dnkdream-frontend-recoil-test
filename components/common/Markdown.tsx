import React, { useEffect, useState } from 'react';
import marked from 'marked';
import Prism from 'prismjs';
import styled from 'styled-components';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

// Styles
const Container = styled.div``;

interface Props {
  markdown: string;
}

const Markdown: React.FC<Props> = ({ markdown }) => {
  const [html, setHtml] = useState('');

  const renderMarkdown = () => {
    if (!markdown) {
      setHtml('');
      return;
    }

    setHtml(
      marked(markdown, {
        breaks: true,
      })
    );
  };

  useEffect(() => {
    renderMarkdown();
  });

  useEffect(() => {
    return () => {
      Prism.highlightAll();
    };
  }, [html]);

  return <Container dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
