import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUrlAction, updateUrlAction } from '../../actions/urlsActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

function SingleUrl() {
    const params = useParams();
    const navigate = useNavigate();
    const [origUrl, setUrlToModif] = useState();
    // const [source, setSource] = useState();
    // const [setMedium, setMedium] = useState();
    const [date, setDate] = useState('');

    const dispatch = useDispatch();

    const urlUpdate = useSelector((state) => state.urlUpdate);
    const { loading, error } = urlUpdate;

    const urlDelete = useSelector((state) => state.urlDelete);
    const { loading: loadingDelete, error: errorDelete } = urlDelete;

    const deleteHandler = (_id) => {
        if (window.confirm('Estás seguro?')) {
            dispatch(deleteUrlAction(_id));
            alert('Nota eliminada con éxito');
        }
        navigate('/mis-urls');
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:5001/api/urls/${params.id}`);
            setUrlToModif(data.origUrl);
            setDate(data.updatedAt);
        };

        fetching();
    }, [params.id, date]);

    const resetHandler = () => {
        setUrlToModif('');
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateUrlAction(params.id /* , origUrl, content, category */));
        // if (!origUrl) return;
        alert('modificado con éxito');
        resetHandler();
        navigate('/mis-urls');
    };

    return (
        <MainScreen origUrl="Editar Url">
            <Card>
                <Card.Header>Edita tu URL</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
                        <Form.Group controlId="origUrl">
                            <Form.Label>Modifica tu url</Form.Label>
                            <Form.Control
                                type="origUrl"
                                placeholder="Enter the origUrl"
                                value={origUrl}
                                onChange={(e) => setUrlToModif(e.target.value)}
                            />
                        </Form.Group>

                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Actualizar url
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(params.id)}>
                            Borrar url
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleUrl;
