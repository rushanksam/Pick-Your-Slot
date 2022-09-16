import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import './interviewer_header.css'
import {useNavigate} from "react-router-dom"
// import './updateslot.css';
// import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Dropdown
} from "react-bootstrap";
// import { useHistory, Link } from "react-router-dom";
import {FaUserAlt} from 'react-icons/fa'

// import './components.css'


function InterviewerHeader()
{
  
  const navigateToInterviewDashboard=()=>{
    navigate("/interviewDashboard");
  };
  
  const navigateToAvailability=()=>{
    navigate("/myavailability");
  };
  const navigate = useNavigate();
  const [show,setShow] = useState();
  const logout = () =>{
    localStorage.clear();
    navigate('/')
  }
  // const show = false;
  const showDropdown = ()=>{
    setShow(!show);
  };
  const hideDropdown = ()=>{
    setShow(false);
  };
    return(

  <Navbar bg="light" expand="md" variant="light" fixed="top">
        <Container fluid >
          <Navbar.Brand onClick={navigateToInterviewDashboard}>
            <img src="logo.png" className="logo1" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="navside me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link className="nav-link navHeadingclass" onClick={navigateToInterviewDashboard}>
                Home
              </Nav.Link>

              <Nav.Link className="nav-link my-availabilityclass navHeadingclass" onClick={navigateToAvailability}>
                My Availability
              </Nav.Link>
{/*               
              <NavDropdown className="profilebtn" title="" id="basic-nav-dropdown">
              <NavDropdown.Item className="logoutBtn" onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link my-availability">
              
              </Nav.Link> */}

              <Dropdown align={{ lg: 'end' }} show={show}
   onMouseEnter={showDropdown} 
   onMouseLeave={hideDropdown}>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                <FaUserAlt color="black" className="navLogolass"/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {/* <Dropdown.Item>Edit Profile</Dropdown.Item> */}
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
          
              
            
            </Nav>

            <Nav.Link>
              {/* <img src="/logo.png" className="logo2" /> */}
             
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default InterviewerHeader;