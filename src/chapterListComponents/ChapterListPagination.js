import React from "react";
import { Pagination } from "react-bootstrap";

export function ChapterListPagination(props) {
    const pageCount = props.pageCount;
    const activePage = props.activePage;
    const items = [];

    for (let i = 1; i <= pageCount; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === activePage}
                onClick={props.handlePaginationItemClick}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.Prev
                onClick={props.handlePaginationPrevClick}
            />
            {items}
            <Pagination.Next
                onClick={props.handlePaginationNextClick}
            />
        </Pagination>
    );
}