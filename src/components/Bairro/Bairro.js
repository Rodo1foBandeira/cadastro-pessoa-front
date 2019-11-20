import React, { useEffect, useState } from 'react';
import { saveBairro, getBairro } from '../../services/bairroService';
import Button from 'react-bootstrap/Button';
import { isNumber } from 'lodash';
import Form from 'react-bootstrap/Form';

function Bairro({ match, history }) {
    const [values, setValues] = useState({ nome: null });

    const handleChange = e => {
        values[e.target.name] = e.target.value;
        setValues({...values});
    }

    const submit = async (e) => {
        e.preventDefault();
        if (isNumber(+match.params.id))
            await saveBairro({ id: match.params.id, ...values})
        else
            await saveBairro(values);
        history.goBack();
    }

    useEffect(async () => {
        if (isNumber(+match.params.id))
            setValues((await getBairro(match.params.id)).data);
    }, [setValues]);
    
    return (
        <React.Fragment>
            <h1>{isNumber(+match.params.id) ? 'Editar' : 'Cadastrar'} bairro</h1>
            <Form onSubmit={submit}>
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome" value={values.nome} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>     
            </Form>
        </React.Fragment>
    )
}

export default Bairro;