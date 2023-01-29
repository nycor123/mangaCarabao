import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../navigationComponents/Header';
import { Footer } from '../navigationComponents/Footer';
import { Reader } from './Reader';
import onePieceChapters from '../OnePiece';

export function ReaderContainer() {
  const [manga, setManga] = useState({
    title: "One Piece",
    chapters: onePieceChapters
  });
  const [chapter, setChapter] = useState("1071");

  const toPrevChapter = (e) => {
    setChapter(prev => parseInt(prev) - 1);
  }

  const toNextChapter = (e) => {
    setChapter(prev => parseInt(prev) + 1);
  }

  return (
    <Container>
      <Header />
      <Reader 
        manga={manga} 
        chapter={chapter}
        pageUrls={manga.chapters[chapter]}
      />
      <Footer 
        chapter={chapter}
        toPrevChapter={toPrevChapter}
        toNextChapter={toNextChapter}
      />
    </Container>
  );
}
