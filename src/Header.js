import React from 'react';
import Nav from 'react-bootstrap/Nav'

function Header() {

    return (
        <Nav
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Nav.Link href="/bairros">Bairros</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Header;