import React,{useState} from "react";
import { Container, Nav, Navbar,Dropdown } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './HeaderBar.css';
const HeaderBar = () => {
  const navigateToTechTracks=()=>{
    navigate("/techTracks");
  }

  const navigateToTagDashboard=()=>{
    navigate("/tagDashboard");
  }

  const navigateToTagTeamReport=()=>{
    navigate("/tagTeamReport");
  }

// import "./HeaderBar.css";
// import {useNavigate} from "react-router-dom"
// const HeaderBar = () => {

  const [show,setShow] = useState();
  const navigate = useNavigate();
  const logout = () =>{
    window.localStorage.clear();
    // window.localStorage.setItem('EmailID','');
    // console.log("logout");
    navigate('/')
  }
  // const show = false;
  const showDropdown = ()=>{
    setShow(!show);
  };
  const hideDropdown = ()=>{
    setShow(false);
  };
  return (
    <div className="header-container">
      <Navbar bg="light" expand="lg" variant="light" fixed="top">
        <Container fluid>
          <Navbar.Brand onClick={navigateToTechTracks}>
            <img src="logo.png" className="logo1" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="navside me-auto my-2 my-lg-0 "
              style={{ maxHeight: "60px" }}
              navbarScroll
            >
              <Nav.Link className="nav-link" onClick={navigateToTechTracks} >
                <p className="navbarstyle" >Home</p>
              </Nav.Link>

              <Nav.Link
                className="nav-link my-availability"
                onClick={navigateToTagDashboard}
              >
                <p className="navbarstyle">My Slots</p>
              </Nav.Link>
              <Nav.Link
                className="nav-link "
                onClick={navigateToTagTeamReport}
                style={{ marginRight: "30px" }}
              >
                <p className="navbarstyle">Reports</p>
              </Nav.Link>
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
    </div>
  );
};

export default HeaderBar;
