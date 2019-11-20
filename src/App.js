import React from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Bairros from './components/Bairro/Bairros';
import Bairro from './components/Bairro/Bairro';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <React.Fragment>
      <Container>
        <Header />
        <Row>
          <Col xs={12}>
            <BrowserRouter>
              <Switch>
                <Route path="/bairros" exact component={Bairros} />
                <Route path="/bairros/:id" component={Bairro} />
              </Switch>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>

    </React.Fragment>
  );
}

export default App;
