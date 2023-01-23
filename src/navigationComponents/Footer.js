import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { ReactComponent as LeftArrow } from '../svg/leftArrow.svg';
import { ReactComponent as RightArrow } from '../svg/rightArrow.svg';

export function Footer(props) {
    return (
        <>
            <Navbar fixed="bottom" bg="light" className='justify-content-center'>
                <NavItem className='mx-3'>
                    <LeftArrow onClick={props.toPrevChapter} />
                </NavItem>
                <NavItem>{props.chapter}</NavItem>
                <NavItem className='mx-3'>
                    <RightArrow onClick={props.toNextChapter} />
                </NavItem>
            </Navbar>
        </>
    );
}