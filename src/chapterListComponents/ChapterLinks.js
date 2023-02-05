import React from "react";
import { Link } from "react-router-dom";

export function ChapterLinks(props) {
    const mangaId = props.mangaId;
    const chapters = props.chapters;
    const chapterLinks = chapters.map(chapter =>
        <li key={chapter.id}>
            <Link to={`/manga/${mangaId}/${chapter.id}`}>
                {chapter.attributes.chapter}
            </Link>
        </li>
    );

    return (
        <ul>{chapterLinks}</ul>
    );
}