import React, { useEffect, useState } from 'react';
import { saveCidade, getCidade } from '../../services/cidadeService';
import { getUf } from '../../services/ufService';
import Button from 'react-bootstrap/Button';
import isNumber from '../utils/parses';
import Form from 'react-bootstrap/Form';

function Cidade({ match, history }) {
    const [values, setValues] = useState({ ufId: null, nome: null });
    const [ufs, setUFs] = useState([]);

    const handleChange = e => {
        values[e.target.name] = e.target.value;
        setValues({...values});
    }

    const submit = async (e) => {
        e.preventDefault();
        if (isNumber(match.params.id))
            await saveCidade({ id: match.params.id, ...values})
        else
            await saveCidade(values);
        history.goBack();
    }

    useEffect(async () => {
        setUFs((await getUf()).data);
        if (isNumber(match.params.id))
            setValues((await getCidade(match.params.id)).data);
    }, [setValues]);
    
    return (
        <React.Fragment>
            <h1>{isNumber(match.params.id) ? 'Editar' : 'Cadastrar'} cidade</h1>
            <Form onSubmit={submit}>
                <Form.Row className="d-flex flex-row-reverse">
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                    <Button variant="secondary" style={{marginRight: 10}} type="button" onClick={e => history.goBack()}>
                        Voltar
                    </Button>
                </Form.Row> 
                <Form.Group controlId="uf">
                    <Form.Label>UF</Form.Label>
                    <Form.Control as="select" name='ufId' onChange={handleChange}>
                    {
                        ufs.map(item => (
                            values.ufId && values.ufId == item.id ?
                                <option value={item.id} selected>{item.sigla}</option> :
                                <option value={item.id}>{item.sigla}</option>
                        ))
                    }                    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome" value={values.nome} onChange={handleChange} />
                </Form.Group>
            </Form>
        </React.Fragment>
    )
}

export default Cidade;