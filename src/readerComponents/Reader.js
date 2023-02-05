import React from 'react';
import Image from 'react-bootstrap/Image';

export function Reader(props) {
    const manga = props.manga;
    const mangaTitle = manga.attributes.title.en;
    const chapter = props.chapter;
    const chapterNumber = chapter.attributes.chapter;
    const chapterTitle = chapter.attributes.title
    const imageUrls = props.imageUrls;
    const urls = imageUrls != null ?
        imageUrls.map(url => {
            return (
                <li key={url}>
                    <Image fluid={true} src={url} />
                </li>
            );
        })
        : <li>Loading...</li>;
    return (
        <>
            <h5>{`${mangaTitle} ${chapterNumber}: ${chapterTitle}`}</h5>
            <ul style={{ listStyle: 'none' }}>{urls}</ul>
        </>
    );
}