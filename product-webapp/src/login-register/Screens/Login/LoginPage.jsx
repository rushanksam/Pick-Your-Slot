/**
 * @author [mayank bahuguna]
 * @email [mayank.bahuguna2@globallogic.com]
 * @create date 2022-04-12 14:55:07
 * @modify date 2022-04-12 14:55:07
 * @desc [login page]
 */

import React, { useState } from "react";
import "../../../App.css";
import Label from "../../Components/LoginInputs/Label";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import PositionedSnackbar from "../../Components/SnackBar";
import jwt from 'jwt-decode';
import axios from 'axios';

//const axios = require("axios");


const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (values.email.length > 255) {
    errors.email = "Maximum email length is 255";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Minimum password length is 6";
  } else if (values.password.length > 255) {
    errors.password = "Maximum password length is 255";
  }
  return errors;
};

export default function LoginPage(props) {

  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showSnackBar: false,
      message: "",
    },
  
    validate,
    onSubmit: (values, { setShow }) => {
      formik.setFieldValue("showSnackBar", false);
      axios
        .post("https://pickmyslot.stackroute.io/authenticationservice/api/v1/login", {
          userEmailId: values.email,
          userPassword: values.password,
        })
        .then((resp) => {
          if (resp.data.JWT_Token !== null) {
            const decodedToken = jwt(resp.data.JWT_Token);
            window.localStorage.setItem("JWT_Token", resp.data.JWT_Token);
            window.localStorage.setItem("EmailID", decodedToken.EmailID);
            if (decodedToken.UserRole.localeCompare("TAG_TEAM_MEMBER") == 0) {
              
              axios.get(`https://pickmyslot.stackroute.io/userservice/api/v1/tagTeam/${decodedToken.EmailID}`)
              .then((response)=>{
                window.localStorage.setItem("tagTeamName", response.data.tagTeamName);
                window.localStorage.setItem("tagMemberName", response.data.tagMemberName);
              })
              //window.location.href = "/techTracks";
              navigate("/techTracks");
            }
            else {
              axios.get(`https://pickmyslot.stackroute.io/userservice/api/v1/interviewer/${decodedToken.EmailID}`)
              .then((response)=>{
                console.log("Data ",response.data.interviewerName)
                window.localStorage.setItem("InterviewerName", response.data.interviewerName);
                window.localStorage.setItem("techTrack", response.data.techTrack);
                navigate("/interviewDashboard")
              });
              
            }
          } else {
            formik.setFieldValue("showSnackBar", true);
            formik.setFieldValue("message", "Invalid username or password");
          }
        })
        .catch((error) => {
          formik.setFieldValue("showSnackBar", true);
          formik.setFieldValue("message", "Some error has occured");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.showSnackBar && <PositionedSnackbar title={formik.values.message} showSnackBar={formik.values.showSnackBar} />}
      <div>
        <p className="text-align-start"></p>
      </div>
      <div className="form-group">
        <Label name={"Email"} />
        <input
          type="email"
          id="email"
          name="email"
          placeholder={"Enter your email"}
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        ></input>
        {formik.touched.email && formik.errors.email ? (
          <div className="formik-error">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="form-group">
        <Label name={"Password"} />
        <input
          type="password"
          name="password"
          id="password"
          placeholder={"Password"}
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        ></input>
        {formik.touched.password && formik.errors.password ? (
          <div className="formik-error">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="form-group">
        <button type="submit" className="login-button">
          <span className="login-button-span">{"Login"}</span>
        </button>
      </div>
      {/* 
      <div className="login-divider d-flex align-items-center">
        <span> -------- or Login with Google -------- </span>
      </div>
      <div className="form-group">
        <GoogleLoginButton name={"Login using google"} />
      </div>
      */}
    </form>
  );
}
