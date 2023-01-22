import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './navigationComponents/Header';
import { Reader } from './Reader';
import onePieceChapters from './OnePiece';

function App() {
  const [manga, setManga] = useState({
    title: "One Piece",
    chapters: onePieceChapters
  });
  const [chapter, setChapter] = useState("Ch1070");
  const [pageUrls, setPageUrls] = useState(manga.chapters[chapter]);

  return (
    <Container>
      <Header />
      <Reader 
        manga={manga} 
        chapter={chapter} 
        pageUrls={pageUrls}
      />
    </Container>
  );
}

export default App;
