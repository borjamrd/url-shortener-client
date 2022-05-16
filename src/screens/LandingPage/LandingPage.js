/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, InputGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingStyles.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

function LandingPage() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { register, handleSubmit } = useForm();
    const [modalShow, setModalShow] = React.useState(false);
    const [url, setUrl] = useState('');
    const [urlmod, setUrlmod] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate('/mis-urls');
        }
        // cutURLguest()
    }, [navigate, userInfo]);

    function ModalUrl(props) {
        return (
            <>
                <Modal
                    show={props.show}
                    onHide={props.handleClose}
                    animation={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Enhorabuena! Aquí tienes tu URL acortada:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>Url original: </strong> {url}
                        </p>
                        <p>
                            <strong>Url acortada: </strong> {urlmod}{' '}
                            <button
                                key={url._id}
                                onClick={() => navigator.clipboard.writeText(`${urlmod}`)}>
                                Copiar
                            </button>
                        </p>
                        <p>
                            <strong>Clicks recibidos: </strong>{' '}
                            <Alert variant="warning">
                                Debes <Link to="/login">iniciar sesión</Link> o{' '}
                                <Link to="/register">crearte una cuenta</Link>
                            </Alert>{' '}
                        </p>
                        <p>
                            <strong>Última modificación: </strong>{' '}
                            <Alert variant="warning">
                                Debes <Link to="/login">iniciar sesión</Link> o{' '}
                                <Link to="/register">crearte una cuenta</Link>
                            </Alert>{' '}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    const handleUrl = (resultForm) => {
        console.log('Result Form: ', resultForm);
        const origUrl = resultForm.origUrl;
        console.log('orgiulr: ', origUrl);
        var params = new URLSearchParams();
        params.append('origUrl', `${origUrl}`);

        try {
            axios({
                method: 'post',
                url: 'http://localhost:5001/api/urls/createwauth',
                // params
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    origUrl: origUrl
                }
            }).then((res) => {
                const data = res.data;
                setModalShow(true);
                setUrl(data.origUrl);
                setUrlmod(data.shortUrl);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div className="wrapper">
                            <div className="typing-demo">
                                <h1 className="title">Url shortener</h1>
                            </div>
                        </div>
                        <div className="url-section">
                            <form onSubmit={handleSubmit(handleUrl)}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">URL</InputGroup.Text>
                                    <input
                                        type="text"
                                        {...register('origUrl', { required: true })}
                                        className="url-landing"
                                    />
                                </InputGroup>

                                <Button size="lg" type="submit" className="acortar">
                                    Acortar
                                </Button>
                            </form>
                        </div>
                        <div className="buttonContainer">
                            <Link to="/login">
                                <Button size="sm" className="landingbutton">
                                    Inicia sesión
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="landingbutton">
                                    Regístrate
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Row>
                <ModalUrl show={modalShow} onHide={() => setModalShow(false)} />
            </Container>
        </div>
    );
}

export default LandingPage;
