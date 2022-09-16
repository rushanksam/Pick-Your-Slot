/**
 * @author [mayank bahuguna]
 * @email [mayank.bahuguna2@globallogic.com]
 * @create date 2022-04-12 14:55:07
 * @modify date 2022-04-12 14:55:07
 * @desc [interviewer registration page]
 */

import React, { useState,useEffect } from "react";
import "../../../App.css";
import Label from "../../Components/LoginInputs/Label";
import { useFormik } from "formik";
import PositionedSnackbar from "../../Components/SnackBar";
const axios = require("axios");

const validate = (values) => {
  
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (values.password.length > 255) {
    errors.password = "Maximum email length is 255";
  }

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Allowed minimum length is 3 characters";
  } else if (values.name.length > 255) {
    errors.name = "Allowed maximum length is 255 characters";
  }

  if (values.techTrack == "noSelect") {
    errors.techTrack = "Tech track is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Allowed minimum length is 6 character";
  } else if (values.password.length > 255) {
    errors.password = "Allowed maximum length is 255 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.password.length < 6) {
    errors.password = "Allowed minimum length is 6 character";
  } else if (values.password.length > 255) {
    errors.password = "Allowed maximum length is 255 characters";
  }

  if (values.password != values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
  
};

export default function InterviewerRegister(props) {

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      techTrack: "noSelect",
      showSnackBar: false,
      message: "",
    },
    validate,
    onSubmit: (values,{resetForm}) => {
      formik.setFieldValue("showSnackBar",false);
      axios
        .post("https://pickmyslot.stackroute.io/userservice/api/v1/interviewerProfile", {
          interviewerEmailId: values.email,
          userPassword: values.password,
          interviewerName: values.name,
          techTrack: values.techTrack,
          profileImage: "",
          phoneNumber: "",
          experience:"",
          workLocation:"",
          aboutMe:""
        })
        .then((resp) => {
          if(resp.status==201){
            axios.post("https://pickmyslot.stackroute.io/authenticationservice/api/v1", {
              userEmailId: resp.data.interviewerEmailId,
              userPassword: resp.data.userPassword,
              userRole: "INTERVIEWER"
            })
            .then((resp) => { 
              resetForm();
              formik.setFieldValue("showSnackBar",true);
              formik.setFieldValue("message","User has registered successfully");
            })
            .catch(error => {
              resetForm();
              formik.setFieldValue("showSnackBar",true);
              formik.setFieldValue("message","Some error has occured");
            })
          }
        })
        .catch((error) => {
          resetForm();
          formik.setFieldValue("showSnackBar",true);
          formik.setFieldValue("message","Some error has occured");
        });
        
    },
  });

  var options = props.tracksList;
  var listItems = options.map((option) => {
    if (option.id == 0) {
      return (
        <option key={option.id} value="noSelect">
          {option.name}
        </option>
      );
    } else {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      );
    }
  });

  return (
    <>
    <form id="interviewer-form" onSubmit={ formik.handleSubmit }>
      {formik.values.showSnackBar && <PositionedSnackbar title={formik.values.message} showSnackBar={formik.values.showSnackBar} />}
      <div className="form-group">
        <Label name={"Name"} />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        ></input>
        {formik.touched.name && formik.errors.name ? (
          <div className="formik-error">{formik.errors.name}</div>
        ) : null}
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
        <Label name={"Tech Track"} />

        <select
          id="techTrack"
          name="techTrack"
          className="tech-track-select form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.techTrack}
        >
          {listItems}
        </select>
        {formik.touched.techTrack && formik.errors.techTrack ? (
          <div className="formik-error">{formik.errors.techTrack}</div>
        ) : null}
      </div>
      <div className="form-group">
        <Label name={"Password"} />
        <input
          id="password"
          name="password"
          type="password"
          placeholder={props.placeholder}
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
        <Label name={"Confirm Password"} />
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={props.placeholder}
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        ></input>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="formik-error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <div className="form-group">
        <button type="submit" className="login-button">
          {"Register"}
        </button>
      </div>
      {/* 
      <div className="login-divider d-flex align-items-center">
        <span> -------- or register with Google -------- </span>
      </div>
      <div className="form-group">
        <GoogleLoginButton name={"Sign up using google"} />
      </div>
      */}
    </form>
    </>
  );
}
