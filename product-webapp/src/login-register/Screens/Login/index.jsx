/**
 * @author [mayank bahuguna]
 * @email [mayank.bahuguna2@globallogic.com]
 * @create date 2022-04-12 14:55:07
 * @modify date 2022-04-12 14:55:07
 * @desc [index page]
 */
import React, { useEffect, useRef } from "react";
import "../../../App.css";
import LoginPage from "./LoginPage";
import TagTeamRegister from "../Register/TagTeamRegister";
import InterviewerRegister from "../Register/InterviewerRegister";
import { useState } from "react";
import PositionedSnackbar from "../../Components/SnackBar";

function RegisterPanel(props) {
  if (props.panel === "interviewer") {
    return <InterviewerRegister tracksList={props.tracksList} />;
  } else if (props.panel == "tagteam") {
    return <TagTeamRegister />;
  } else {
    return <></>;
  }
}

export default function LoginContainer() {
  let [registerToggler, setRegisterToggler] = useState("tagteam");

  function handleTagTeamClick(e) {
    e.target.defaultChecked = true;
    setRegisterToggler(e.target.value);
  }

  function handleInterviewerClick(e) {
    e.target.defaultChecked = true;
    setRegisterToggler(e.target.value);
  }

  let tracksList = [
    { id: 0, name: "Select option" },
    { id: "JavaScript", name: "JavaScript" },
    { id: "Full Stack", name: "Full Stack" },
    { id: "Backend", name: "Backend" },
    { id: "Java", name: "Java" },
    { id: "Spring", name: "Spring" },
    { id: "React", name: "React" },
    { id: "Angular", name: "Angular" },
    { id: "Python", name: "Python" },
    
  ];

  const sliderElementButton = useRef();

  useEffect(() => {
    setInterval(() => {
      sliderElementButton.current.click();  
    }, 5000);
  },[]);

  return (
    <div className="container-fluid">
      <div className="row  login-row">
        <div className=" d-flex justify-content-center">
          <img className="small-banner-image" src="../../assets/logo/pick-your-slot.png"/>
        </div>
        
        <div className="col-lg-7 d-none d-lg-block image-section">
          <img
              className="main-logo-left"
              src="../../assets/logo/pick-your-slot.png"
          />
          <div id="carouselExampleIndicators" className="carousel slide" data-interval="false" data-bs-ride="carousel">
            <div className="carousel-indicators d-none">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src='assets/banner-image/conflict.png' className="d-block conflict" alt="conflict" /> 
                <div className="d-flex flex-row justify-content-center">
                  <h2>Easily resolve interview slots booking conflicts</h2>
                </div>
              </div>
              <div className="carousel-item carousel-image">
                <img src='assets/banner-image/email.jpg' className="d-block carousel-image-2" alt="email" /> 
                <div className="d-flex flex-row justify-content-center">
                  <h2>Get email notifications when tag team member books a slot</h2>
                </div>
              </div>
              <div className="carousel-item carousel-image">
              <img src='assets/banner-image/slot_booking.jpg' className="d-block carousel-image-3" alt="slot booking" /> 
                <div className="d-flex flex-row justify-content-center">
                  <h2>Select a track and an interviewer then book the slot</h2>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" ref={sliderElementButton} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="login-container overflow-auto d-flex flex-column justify-content-start align-items-center align-content-stretch col-lg-5">
          <div className="login-div">
            <div className="d-flex justify-content-center mt-5">
            
            </div>
            <div className="login-panel-tab">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active nav-link-colorize"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Login
                  </button>
                  <button
                    className="nav-link nav-link-colorize"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Register
                  </button>
                </div>
              </nav>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <LoginPage />
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="form-check-div">
                  <div className="form-check d-inline-flex">
                    <input
                      className="form-check-input home-radio-option"
                      type="radio"
                      name="flexRadioDefault"
                      value={"tagteam"}
                      onClick={(e) => {
                        handleTagTeamClick(e);
                      }}
                      defaultChecked
                    />
                    <label
                      className="form-check-label home-radio-option-label"
                      htmlFor="flexRadioDefault1"
                    >
                      <span className="signup-radio-option">Tag team</span>
                    </label>
                  </div>
                  <div className="form-check d-inline-flex ml-5">
                    <input
                      className="form-check-input home-radio-option"
                      type="radio"
                      name="flexRadioDefault"
                      value={"interviewer"}
                      onClick={(e) => {
                        handleInterviewerClick(e);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      <span className="signup-radio-option">Interviewer</span>
                    </label>
                  </div>
                </div>
                <div>
                  <RegisterPanel
                    tracksList={tracksList}
                    panel={registerToggler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
