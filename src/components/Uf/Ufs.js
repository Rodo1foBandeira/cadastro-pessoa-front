import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getUf, deleteUf } from '../../services/ufService';
import Button from 'react-bootstrap/Button';

function UFs({match}) {
  const [ufs, setUFs] = useState([]);

  useEffect(async () => {
    setUFs((await getUf()).data);
  }, []);

  const deletar = async (id) => {    
    await deleteUf(id);
    setUFs((await getUf()).data);
  }

  return (
    <React.Fragment>
      <h1>UFs</h1>
      
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
            ufs.map(item => (
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

export default UFs;