import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getCidade, deleteCidade } from '../../services/cidadeService';
import Button from 'react-bootstrap/Button';

function Cidades({match}) {
  const [cidades, setCidades] = useState([]);

  useEffect(async () => {
    setCidades((await getCidade()).data);
  }, [setCidades]);

  const deletar = async (id) => {    
    await deleteCidade(id);
    setCidades((await getCidade()).data);
  }

  return (
    <React.Fragment>
      <h1>Cidades</h1>
      
      <Button variant="primary" type="button" href={`${match.path}/novo`}>
        Novo
      </Button>
      
      <Table striped bordered hover style={{ marginTop: 10}}>
        <thead>
          <tr>
            <th>#</th>
            <th>UF</th>
            <th>Nome</th>            
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            cidades.map(item => (
              <tr>
                <td>{item.id}</td>
                <td>{item.uf.sigla}</td>
                <td>{item.nome}</td>
                <td>
                  <Button variant="warning" size="sm" type="button" href={`${match.path}/${item.id}`}>
                    Editar
                  </Button>
                  <Button variant="danger" style={{marginLeft: 10 }} size="sm" type="button" onClick={e => deletar(item.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default Cidades;