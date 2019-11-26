import React, { useEffect, useState } from 'react';
import { savePessoa, getPessoa } from '../../services/pessoaService';
import { getCidade } from '../../services/cidadeService';
import { getBairro } from '../../services/bairroService';
import Button from 'react-bootstrap/Button';
import isNumber from '../utils/parses';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function Pessoa({ match, history }) {
    const [values, setValues] = useState(
        {
            nomeRazao: null,
            cpfCnpj: null,
            tipoPessoa: "FISICA",
            endereco: null,
            numero: null,
            cep: null,
            bairroId: 1,
            cidadeId: 1,            
            emails: [],
            fones: []
        }
    );
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    const handleChange = e => {
        if (isNumber(e.target.value)){
            eval('values.'+[e.target.name]+ '=' + isNumber(e.target.value));
        } else {
            eval('values.'+[e.target.name]+ '="' + e.target.value + '"');
        }
        
        setValues({...values});
    }

    const submit = async (e) => {
        e.preventDefault();
        if (isNumber(match.params.id))
            await savePessoa({ id: match.params.id, ...values})
        else
            await savePessoa(values);
        history.goBack();
    }

    const addFone = () => {
        values.fones.push({ddd: null, numero: null});
        setValues({...values})
    }

    const removeFone = i => {
        values.fones.pop(i);
        setValues({...values})
    }

    useEffect(async () => {
        setCidades((await getCidade()).data);
        setBairros((await getBairro()).data);
        if (isNumber(match.params.id))
            setValues((await getPessoa(match.params.id)).data);
    }, [setValues]);
    
    return (
        <React.Fragment>
            <h1>{isNumber(match.params.id) ? 'Editar' : 'Cadastrar'} pessoa</h1>
            <Form onSubmit={submit}>
                <Form.Row>
                    <Button variant="primary" type="submit" className="ml-auto">
                        Salvar
                    </Button>
                </Form.Row>                
                <Form.Group controlId="nome">
                    <Form.Label>Nome/Razão</Form.Label>
                    <Form.Control type="text" name="nomeRazao" placeholder="Nome" value={values.nomeRazao} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="tipo_pessoa">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="select" name='tipoPessoa' onChange={handleChange}>                    
                        <option value="FISICA" selected={values.tipoPessoa && values.tipoPessoa == "FISICA"}>Fisica</option> :
                        <option value="JURIDICA" selected={values.tipoPessoa && values.tipoPessoa == "JURIDICA"}>Juridica</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="cpf_cnpj">
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <Form.Control type="text" name="cpfCnpj" placeholder="CPF/CNPJ" value={values.cpfCnpj} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="cep">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" name="cep" placeholder="CEP" value={values.cep} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="endereco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" name="endereco" placeholder="Endereço" value={values.endereco} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="bairro">
                    <Form.Label>UF</Form.Label>
                    <Form.Control as="select" name='bairroId' onChange={handleChange}>
                    {
                        bairros.map(item => (
                            values.bairroId && values.bairroId == item.id ?
                                <option value={item.id} selected>{item.nome}</option> :
                                <option value={item.id}>{item.nome}</option>
                        ))
                    }                    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="cidade">
                    <Form.Label>UF</Form.Label>
                    <Form.Control as="select" name='cidadeId' onChange={handleChange}>
                    {
                        cidades.map(item => (
                            values.cidadeId && values.cidadeId == item.id ?
                                <option value={item.id} selected>{item.nome}</option> :
                                <option value={item.id}>{item.nome}</option>
                        ))
                    }                    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fones">
                    <Form.Label>Fones</Form.Label>
                    <Form.Row>
                        <Button size="sm" variant="warning" onClick={addFone} type="button">
                            Adicionar
                        </Button>
                    </Form.Row>
                    {                        
                        values.fones.map((v, i) => (
                            <Form.Row style={{ marginTop: 10 }}>
                                <Col>
                                    <Form.Control type="text" name={`fones[${i}].ddd`} placeholder="DDD" value={values.fones[i].ddd} onChange={handleChange} />
                                </Col>
                                <Col>
                                    <Form.Control type="text" name={`fones[${i}].numero`} placeholder="Numero" value={values.fones[i].numero} onChange={handleChange} />
                                </Col>
                                <Button size="sm" variant="danger" onClick={e => {removeFone(i)}} type="button">
                                    Remover
                                </Button>
                            </Form.Row>                            
                        ))
                    }
                    <hr />
                </Form.Group>                
            </Form>
        </React.Fragment>
    )
}

export default Pessoa;