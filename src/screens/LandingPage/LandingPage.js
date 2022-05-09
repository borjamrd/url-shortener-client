import React, { useEffect } from "react";
import { Button, Container, FormControl, FormLabel, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate("/mis-urls");
    }
    cutURLguest()
  }, [navigate, userInfo]);


  const cutURLguest = (e) =>{
    console.log(e)
    try {
      axios.post('http://localhost:5001/api/urls/createwauth', {origUrl}).then((res)=>{
        console.log(res.data)
      })
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  }

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
    
            <div class="wrapper">
                  <div className="typing-demo">
                  <h1 className="title">Url shortener</h1>
                   </div>
                   
            </div>
            <div className="url-section">
              <form  >
                    <InputGroup onSubmit={(origUrl)=>cutURLguest()} className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                       URL
                      </InputGroup.Text>
                      <FormControl id="basic-url" className="url-landing"/>
                    </InputGroup>
                    <Button size="lg" type="submit" className="acortar">
                  Acortar
                </Button>
                </form>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="sm" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>

      
            
            
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
