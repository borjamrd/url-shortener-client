import React, { useEffect } from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

function Header({ setSearch }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {}, [userInfo]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Url shortener</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        {userInfo && (
                            <Form inline>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form>
                        )}
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <>
                                <Nav.Link href="/mis-urls">Mis urls</Nav.Link>
                                <NavDropdown
                                    title={`${userInfo.name}`}
                                    id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/profile">
                                        {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                                        MI perfil
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Cerrar sesión
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
