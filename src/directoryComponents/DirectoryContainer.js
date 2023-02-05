import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../navigationComponents/Header';
import axios from 'axios';
import { DirectoryLinks } from './DirectoryLinks';
import config from '../config';

export function DirectoryContainer() {
    const [mangaList, setMangaList] = useState(null);
    const baseURL = config.MANGADEX_BASEURL;

    useEffect(() => {
        const fetchMangaList = async () => {
            const resp = await axios({
                method: 'GET',
                url: `${baseURL}/manga?limit=10&title=One%20Piece`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMangaList(resp.data.data);
        };
        fetchMangaList();
    }, []);

    return (
        <Container>
            <Header />
            <h1>Directory</h1>
            {mangaList != null ? 
                <DirectoryLinks mangaList={mangaList} /> 
                : <h2>Loading...</h2>}
        </Container>
    );
}