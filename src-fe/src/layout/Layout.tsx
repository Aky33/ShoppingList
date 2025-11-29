import React from 'react';
import NavBar from '../components/common/nav-bar';
import { Alert, Container } from 'react-bootstrap';
import { useError } from '../hooks/use-error';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { error, setError } = useError();

    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error.message}</Alert>}

                <Container className='mt-4'>{children}</Container>
            </main>
            <footer />
        </div>
    )
}

export default Layout