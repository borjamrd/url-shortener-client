import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingStyles.css";
import { useNavigate } from "react-router-dom";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate("/mis-urls");
    }
  }, [navigate, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
    
            <div class="wrapper">
                  <div class="typing-demo">
                  <h1 className="title">Url shortener</h1>
                   </div>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
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
