import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { ChapterLinks } from './ChapterLinks';
import { Header } from '../navigationComponents/Header';

export async function loader({ params }) {
    return params;
}

export function ChapterListContainer() {
    const [chapters, setChapters] = useState(null);
    const mangaId = useLoaderData().mangaId;
    const baseURL = config.MANGADEX_BASEURL;

    useEffect(() => {
        const fetchMangaChapters = async () => {
            const resp = await axios({
                method: 'GET',
                url: `${baseURL}/chapter?limit=10&manga=${mangaId}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setChapters(resp.data.data);
        };
        fetchMangaChapters();
    }, []);

    console.log(chapters);

    return (
        <>
            <Header />
            <h1>Chapters:</h1>
            {chapters != null ? 
                <ChapterLinks mangaId={mangaId} chapters={chapters} /> 
                : <h2>Loading chapters...</h2>
            }
        </>
    );
}