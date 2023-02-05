import React, { useEffect, useState } from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as AvatarIcon } from "../svg/avatarIcon.svg";
import { ReactComponent as SearchIcon } from "../svg/searchIcon.svg";
import { default as logo } from "../svg/brandLogo.svg";
import { default as logoSm } from "../svg/brandLogoSm.svg";

export function Header() {
    const [brandLogo, setBrandLogo] = useState(logo);

    useEffect(() => { 
        if (window.innerWidth < 992) {
            setBrandLogo(logoSm);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 992) {
            setBrandLogo(logoSm);
        } else {
            setBrandLogo(logo);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />
            <Navbar.Brand className='mx-3'>
                <Link to='/'><img alt="Brand Logo" src={brandLogo} /></Link>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end me-2'>
                <Link className='mx-2' to='/directory' style={{textDecoration: 'none', color: 'inherit'}}>Directory</Link>
                <NavLink className='mx-2'>Popular</NavLink>
                <NavLink className='mx-2'>Updates</NavLink>
                <NavLink className='mx-2'>New</NavLink>
            </Navbar.Collapse>
            <NavItem className='mx-2'>
                <AvatarIcon className='mx-2' />
                <SearchIcon className='mx-2' />
            </NavItem>
        </Navbar>
    );
}