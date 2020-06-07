import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getBairro, deleteBairro } from '../../services/bairroService';
import Button from 'react-bootstrap/Button';

function Bairros({match}) {
  const [bairros, setBairros] = useState([]);

  useEffect(async () => {
    setBairros((await getBairro()).data);
  }, []);

  const deletar = async (id) => {    
    await deleteBairro(id);
    setBairros((await getBairro()).data);
  }

  return (
    <React.Fragment>
      <h1>Bairros</h1>
      
      <Button variant="primary" type="button" href={`${match.path}/novo`}>
        Novo
      </Button>
      
      <Table striped bordered hover style={{ marginTop: 10}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            bairros.map(item => (
              <tr>
                <td>{item.id}</td>
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

export default Bairros;