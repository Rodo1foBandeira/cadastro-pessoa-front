import React from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Bairros from './components/Bairro/Bairros';
import Bairro from './components/Bairro/Bairro';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UFs from './components/Uf/Ufs';
import UF from './components/Uf/Uf';
import Cidades from './components/Cidade/Cidades';
import Cidade from './components/Cidade/Cidade';
import Pessoas from './components/Pessoa/Pessoas';
import Pessoa from './components/Pessoa/Pessoa';


function App() {
  return (
    <React.Fragment>
      <Container>
        <Header/>
        <Row>
          <Col xs={12}>
            <BrowserRouter>
              <Switch>
                <Route path="/bairros" exact component={Bairros} />
                <Route path="/bairros/:id" exact component={Bairro} />
                <Route path="/ufs" exact component={UFs} />
                <Route path="/ufs/:id" exact component={UF} />
                <Route path="/cidades" exact component={Cidades} />
                <Route path="/cidades/:id" exact component={Cidade} />
                <Route path="/pessoas" exact component={Pessoas} />
                <Route path="/pessoas/:id" exact component={Pessoa} />
              </Switch>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>

    </React.Fragment>
  );
}

export default App;
