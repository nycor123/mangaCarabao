import React from 'react';
import { Link } from 'react-router-dom';

export function DirectoryLinks(props) {
    const mangaList = props.mangaList;
    const links = mangaList.map(manga =>
        <li key={manga.id}>
            <Link to={`/manga/${manga.id}`}>
                {manga.attributes.title.en}
            </Link>
        </li>
    );

    return (
        <ul style={{ listStyle: 'none' }}>
            {links}
        </ul>
    );
}