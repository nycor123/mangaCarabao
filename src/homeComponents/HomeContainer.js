import React from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../navigationComponents/Header';

export function HomeContainer() {
    return (
        <Container>
            <Header />
            <h1>Home</h1>
        </Container>
    );
}