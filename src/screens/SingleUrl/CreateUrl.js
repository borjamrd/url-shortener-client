import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUrlAction } from "../../actions/urlsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateUrl({ history }) {
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setUrl("");

  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUrlAction(url));
    if (!origUrl ) return;

    resetHandler();
    history.push("/mis-urls");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Crear una url">
      <Card>
        <Card.Header>Crea una nueva URL</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                value={url}
                placeholder="Entroduce una URL"
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
{/* 
            <Form.Group controlId="content">
              <Form.Label>Parámetros UTM (opcionales) </Form.Label>
              <Form.Control
               type="url"
                value={content}
                placeholder="SOURCE: e.g. google, newsletter"
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Control
               type="url"
                value={content}
                placeholder="MEDUUM: e.g. banner, email"
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Control
               type="url"
                value={content}
                placeholder="CAMPAIGN: e.g. spring_sale"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )} */}
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Crear URL
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Limpiar campos
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateUrl;
