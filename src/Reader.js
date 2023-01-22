import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export function Reader(props) {
    const manga = props.manga;
    const heading = manga.title + " " + props.chapter;
    const pages = props.pageUrls.map(url => {
        return (
            <li id={url}>
                <Image fluid={true} src={url} />
            </li>
        );
    });

    return (
        <>
            <h2>{heading}</h2>
            <ul style={{listStyle: 'none'}}>{pages}</ul>
        </>
    );
}