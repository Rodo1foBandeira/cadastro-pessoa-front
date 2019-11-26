import React, { useEffect, useState } from 'react';
import { saveBairro, getBairro } from '../../services/bairroService';
import Button from 'react-bootstrap/Button';
import isNumber from '../utils/parses';
import Form from 'react-bootstrap/Form';

function Bairro({ match, history }) {
    const [values, setValues] = useState({ nome: null });

    const handleChange = e => {
        values[e.target.name] = e.target.value;
        setValues({...values});
    }

    const submit = async (e) => {
        e.preventDefault();
        if (isNumber(match.params.id))
            await saveBairro({ id: match.params.id, ...values})
        else
            await saveBairro(values);
        history.goBack();
    }

    useEffect(async () => {
        if (isNumber(match.params.id))
            setValues((await getBairro(match.params.id)).data);
    }, [setValues]);
    
    return (
        <React.Fragment>
            <h1>{isNumber(match.params.id) ? 'Editar' : 'Cadastrar'} bairro</h1>
            <Form onSubmit={submit}>
                <Form.Row className="d-flex flex-row-reverse">
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                    <Button variant="secondary" style={{marginRight: 10}} type="button" onClick={e => history.goBack()}>
                        Voltar
                    </Button>
                </Form.Row>  
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome" value={values.nome} onChange={handleChange} />
                </Form.Group>                  
            </Form>
        </React.Fragment>
    )
}

export default Bairro;