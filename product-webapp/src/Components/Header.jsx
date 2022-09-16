import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
// import { useHistory, Link } from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import "./components.css";

function Header() {

  const navigate = useNavigate();

  const navigateToInterviewDashboard=()=>{
    navigate("/interviewDashboard");
  };

  const navigateToAvailability=()=>{
    navigate("/myavailability");
  };
  // const history = useHistory();
  return (
    <div className="header-container">
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/interviewDashboard">
            <img src="logo.png" className="logo1" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="navside me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="nav-link" onClick={navigateToInterviewDashboard}>
                Home
              </Nav.Link>

              <Nav.Link className="nav-link my-availability" onClick={navigateToAvailability}>
                My Availability
              </Nav.Link>
              <FaUserAlt color="black" className="profileLogo" />
            </Nav>

            <Nav.Link>
              {/* <img src="/logo.png" className="logo2" /> */}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
