import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getPessoa, deletePessoa } from '../../services/pessoaService';
import Button from 'react-bootstrap/Button';

function Pessoas({match}) {
  const [pessoas, setPessoas] = useState([]);

  useEffect(async () => {
    setPessoas((await getPessoa()).data);
  }, []);

  const deletar = async (id) => {    
    await deletePessoa(id);
    setPessoas((await getPessoa()).data);
  }

  return (
    <React.Fragment>
      <h1>Pessoas</h1>
      
      <Button variant="primary" type="button" href={`${match.path}/novo`}>
        Novo
      </Button>
      
      <Table striped bordered hover style={{ marginTop: 10}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Pessoa</th>
            <th>CNPJ/CPF</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            pessoas.map(item => (
              <tr>
                <td>{item.id}</td>
                <td>{item.nomeRazao}</td>
                <td>{item.tipoPessoa == 'FISICA' ? 'Fisica' : 'Juridica'}</td>
                <td>{item.cpfCnpj}</td>
                <td>{item.cidade.nome}</td>
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

export default Pessoas;