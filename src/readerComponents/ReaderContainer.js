import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../navigationComponents/Header';
import { ReaderNavigation } from './ReaderNavigation';
import { Reader } from './Reader';
import { useLoaderData } from 'react-router-dom';
import config from '../config';
import axios from 'axios';

export async function loader({ params }) {
  return params;
}

export function ReaderContainer() {
  const mangaId = useLoaderData().mangaId;
  const [manga, setManga] = useState(null);
  const [chapterId, setChapterId] = useState(useLoaderData().chapterId);
  const [chapter, setChapter] = useState(null);
  const [chapterDeliveryMetadata, setChapterDeliveryMetadata] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      const resp = await axios({
        method: 'GET',
        url: config.MANGADEX_BASEURL + `/manga/${mangaId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setManga(resp.data.data);
    };

    const fetchChapter = async () => {
      const resp = await axios({
        method: 'GET',
        url: config.MANGADEX_BASEURL + `/chapter/${chapterId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setChapter(resp.data.data);
    };

    const fetchChapterDeliveryMetadata = async () => {
      const resp = await axios({
        method: 'GET',
        url: config.MANGADEX_IMAGESERVERURL + `/${chapterId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setChapterDeliveryMetadata(resp.data);
    };

    fetchManga();
    fetchChapter();
    fetchChapterDeliveryMetadata();
  }, [chapterId]);

  useEffect(() => {
    if (chapterDeliveryMetadata != null) {
      const baseUrl = chapterDeliveryMetadata.baseUrl;
      const chapterHash = chapterDeliveryMetadata.chapter.hash;
      const chapterData = chapterDeliveryMetadata.chapter.data;
      const generatedUrls = chapterData.map((data) => {
        return baseUrl + `/data/${chapterHash}/${data}`;
      });
      setImageUrls(generatedUrls);
    }
  }, [chapterDeliveryMetadata]);

  useEffect(() => {
    const fetchChapters = async () => {
      let _chapters = [];
      let pages = 0;

      const resp = await axios({
        method: 'GET',
        url: config.MANGADEX_BASEURL + `/manga/${mangaId}/feed?offset=0&order%5Bchapter%5D=asc`,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          translatedLanguage: ['en']
        }
      });
      pages = Math.floor(resp.data.total / 100);

      for (let i = 0; i <= pages; i++) {
        const _resp = await axios({
          method: 'GET',
          url: config.MANGADEX_BASEURL + `/manga/${mangaId}/feed?offset=${i * 100}&order%5Bchapter%5D=asc`,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            translatedLanguage: ['en']
          }
        });

        _chapters.push(..._resp.data.data);
      }

      setChapters(_chapters);
    };

    fetchChapters();
  }, []);

  const toPrevChapter = () => {
    const chapterIndex = chapters.map((ch) => ch.id).indexOf(chapter.id);
    if (chapterIndex > 0) {
      setChapterId(chapters[chapterIndex - 1].id);
    }
  };

  const toNextChapter = () => {
    const chapterIndex = chapters.map((ch) => ch.id).indexOf(chapter.id);
    if (chapterIndex < chapters.length - 1) {
      setChapterId(chapters[chapterIndex + 1].id);
    }
  }

  return (
    <Container>
      <Header />
      {
        (manga !== null && chapter !== null && imageUrls !== null && chapters !== null) ?
          <>
            <Reader
              manga={manga}
              chapter={chapter}
              imageUrls={imageUrls}
            />
            <ReaderNavigation
              chapter={chapter.attributes.chapter}
              toPrevChapter={toPrevChapter}
              toNextChapter={toNextChapter}
            />
          </>
          : <></>
      }
    </Container>
  );
}
