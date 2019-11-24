import React, { useEffect, useState } from 'react';
import { saveUf, getUf } from '../../services/ufService';
import Button from 'react-bootstrap/Button';
import isNumber from '../utils/parses';
import Form from 'react-bootstrap/Form';

function UF({ match, history }) {
    const [values, setValues] = useState({ nome: null, sigla: null });

    const handleChange = e => {
        values[e.target.name] = e.target.value;
        setValues({...values});
    }

    const submit = async (e) => {
        e.preventDefault();
        if (isNumber(match.params.id))
            await saveUf({ id: match.params.id, ...values})
        else
            await saveUf(values);
        history.goBack();
    }

    useEffect(async () => {
        if (isNumber(match.params.id))
            setValues((await getUf(match.params.id)).data);
    }, [setValues]);
    
    return (
        <React.Fragment>
            <h1>{isNumber(match.params.id) ? 'Editar' : 'Cadastrar'} UF</h1>
            <Form onSubmit={submit}>
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome" value={values.nome} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="nome">
                    <Form.Label>Sigla</Form.Label>
                    <Form.Control type="text" name="sigla" placeholder="Sigla" value={values.sigla} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>     
            </Form>
        </React.Fragment>
    )
}

export default UF;