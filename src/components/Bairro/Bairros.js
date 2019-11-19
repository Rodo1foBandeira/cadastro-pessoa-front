import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { getBairros } from '../../services/bairroService'

function Bairros() {
  const [bairros, setBairros] = useState([]);

  useEffect(async () => {
      setBairros((await getBairros()).data);
  }, [setBairros]);

  return (
    <React.Fragment>
    <h1>Bairros</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>          
          {            
            bairros.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
              </tr>
            ))
          }          
        </tbody>
      </Table>
  </React.Fragment>
  )
}

export default Bairros;