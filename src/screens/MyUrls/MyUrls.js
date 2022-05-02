import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrlAction, listUrls } from "../../actions/urlsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


function MyUrls({ history, search }) {
  const dispatch = useDispatch();

  const urlList = useSelector((state) => state.urlList);
  const { loading, error, urls } = urlList;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const urlDelete = useSelector((state) => state.urlDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = urlDelete;

  const urlCreate = useSelector((state) => state.urlCreate);
  const { success: successCreate } = urlCreate;

  const urlUpdate = useSelector((state) => state.urlUpdate);
  const { success: successUpdate } = urlUpdate;

  useEffect(() => {
    dispatch(listUrls());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Estás seguro?")) {
      dispatch(deleteUrlAction(id));
    }
  };


  return (
    <MainScreen title={`Hola de nuevo ${userInfo && userInfo.name}..`}>
      {console.log(urlList)}
      <Link to="/crear-url">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Crear una nueva URL
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {urlList.URLS &&
        urlList.URLS.map((url) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={url.origUrl}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(url)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {url.origUrl}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/url/${url.origUrl}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(url.origUrl)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {url.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{url.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {url.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}






export default MyUrls;
