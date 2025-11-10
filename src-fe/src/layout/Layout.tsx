import React from 'react';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Container className='mt-4'>{children}</Container>
            </main>
            <footer />
        </div>
    )
}

export default Layout