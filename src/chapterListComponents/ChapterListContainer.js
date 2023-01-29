import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Header } from '../navigationComponents/Header';
import { ChapterLinks } from './ChapterLinks';
import { ChapterListPagination } from './ChapterListPagination';
import axios from 'axios';
import config from '../config';

const baseURL = config.MANGADEX_BASEURL;
const limit = 50;

export async function loader({ params }) {
    return params;
}

export function ChapterListContainer() {
    const mangaId = useLoaderData().mangaId;
    const [chapters, setChapters] = useState(null);
    const [chapterCount, setChapterCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [url, setUrl] = useState(`${baseURL}/manga/${mangaId}/feed?limit=${limit}&offset=0&order%5Bchapter%5D=asc`);
    const pageCount = Math.ceil(chapterCount / limit);

    useEffect(() => {
        const fetchMangaChapters = async () => {
            const resp = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    translatedLanguage: ['en']
                }
            });
            setChapterCount(resp.data.total);
            setChapters(resp.data.data);
        };
        fetchMangaChapters();
    }, [url]);

    useEffect(() => {
        setUrl(`${baseURL}/manga/${mangaId}/feed?limit=${limit}&offset=${(activePage - 1) * limit}&order%5Bchapter%5D=asc`);
    }, [activePage]);

    const handlePaginationItemClick = (e) => {
        setActivePage(parseInt(e.target.innerText));
    };

    const handlePaginationPrevClick = () => {
        if (activePage > 1) {
            setActivePage((prev) => prev - 1);
        }
    };

    const handlePaginationNextClick = () => {
        if (activePage < pageCount) {
            setActivePage((prev) => prev + 1);
        }
    };

    return (
        <>
            <Header />
            <h1>Chapters:</h1>
            {
                chapters != null ?
                    <ChapterLinks
                        mangaId={mangaId}
                        chapters={chapters}
                    />
                    : <h2>Loading chapters...</h2>
            }
            {
                chapterCount > limit ?
                    <ChapterListPagination
                        pageCount={pageCount}
                        activePage={activePage}
                        handlePaginationItemClick={handlePaginationItemClick}
                        handlePaginationPrevClick={handlePaginationPrevClick}
                        handlePaginationNextClick={handlePaginationNextClick}
                    />
                    : <></>
            }
        </>
    );
}