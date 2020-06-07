import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Cadastro Pessoa</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/bairros" eventKey="/bairros">Bairros</Nav.Link>
                <Nav.Link href="/ufs" eventKey="/ufs">UFs</Nav.Link>
                <Nav.Link href="/cidades" eventKey="/cidades">Cidades</Nav.Link>
                <Nav.Link href="/pessoas" eventKey="/pessoas">Pessoas</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;