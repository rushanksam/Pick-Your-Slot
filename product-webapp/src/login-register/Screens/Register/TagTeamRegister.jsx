/**
 * @author [mayank bahuguna]
 * @email [mayank.bahuguna2@globallogic.com]
 * @create date 2022-04-12 14:55:07
 * @modify date 2022-04-12 14:55:07
 * @desc [tag team registration page]
 */

import React from "react";
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
  } else if (values.email.length > 255) {
    errors.email = "Allowed maximum length is 255 characters";
  }

  if (!values.memberName) {
    errors.memberName = "Member name is required";
  } else if (values.memberName.length < 3) {
    errors.memberName = "Allowed minimum length is 3 characters";
  } else if (values.memberName.length > 255) {
    errors.memberName = "Allowed maximum length is 255 characters";
  }

  if (!values.teamName) {
    errors.teamName = "Team name is required";
  } else if (values.teamName.length < 1) {
    errors.teamName = "Allowed minimum length is 1 character";
  } else if (values.teamName.length > 255) {
    errors.teamName = "Allowed maximum length is 255 characters";
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
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword = "Allowed minimum length is 6 character";
  } else if (values.confirmPassword.length > 255) {
    errors.confirmPassword = "Allowed maximum length is 255 characters";
  }

  if (values.password != values.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return errors;
};

export default function TagTeamRegister(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      memberName: "",
      teamName: "",
      password: "",
      confirmPassword: "",
      showSnackBar: false,
      message: "",
    },
    validate,
    onSubmit: (values,{resetForm}) => {
      formik.setFieldValue("showSnackBar",false);
      axios
        .post("https://pickmyslot.stackroute.io/userservice/api/v1/tagTeam", {
          tagMemberEmailId: values.email,
          tagMemberName: values.memberName,
          tagTeamName: values.teamName,
          tagTeamPassword: values.password,
          tagTeamProfileImage:"",
          phoneNumber:"",
          experience:"",
          workLocation:"",
          aboutMe:""
        })
        .then((resp) => {
          if(resp.status==201){
            axios.post("https://pickmyslot.stackroute.io/authenticationservice/api/v1", {
              userEmailId: resp.data.tagMemberEmailId,
              userPassword: resp.data.tagTeamPassword,
              userRole: "TAG_TEAM_MEMBER"
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

  return (
    <form id="tag-team-form" onSubmit={formik.handleSubmit}>
      {formik.values.showSnackBar && <PositionedSnackbar title={formik.values.message} showSnackBar={formik.values.showSnackBar} />}
      <div className="form-group">
        <Label name={"Name"} />
        <input
          id="memberName"
          name="memberName"
          type="text"
          placeholder="Enter your name"
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.memberName}
        ></input>
        {formik.touched.memberName && formik.errors.memberName ? (
          <div className="formik-error">{formik.errors.memberName}</div>
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
        <Label name={"Team Name"} />
        <input
          id="teamName"
          name="teamName"
          type="text"
          placeholder="Enter your team name"
          className="login-text-input form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.teamName}
        ></input>
        {formik.touched.teamName && formik.errors.teamName ? (
          <div className="formik-error">{formik.errors.teamName}</div>
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
  );
}
