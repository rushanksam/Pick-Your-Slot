import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../Components/HeaderBar";
import { Row } from "react-bootstrap";
import InterviewerCard from "../Components/InterviewerCard";
import "./Interviewers.css";
const Interviewers = (props) => {
  const location = useLocation();
  const [interviewer, setInterviewer] = useState([]);
  const emailId = window.localStorage.getItem("EmailID");
  const fetchData = () => {
    //http://localhost:3005/interviewerProfile?techTrack=${location.state.data}
    axios
      .get(`https://pickmyslot.stackroute.io/userservice/api/v1/techTrack/${location.state.data}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setInterviewer(res);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeaderBar />
      <div>
        <p className="headingInterviewers">{location.state.data}</p>
      </div>
      <div className="p-4 interviewersDisplay">
        {!interviewer[0] ? (
          <div>
            <h3 className="interviewersDisplay">
              Sorry!! No Interviewers present at the moment!!
            </h3>
          </div>
        ) : (
          <Row>
            {interviewer.map((data) => (
              <div key={data.id} style={{ width: "400px" }}>
                <InterviewerCard data={data}></InterviewerCard>
              </div>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default Interviewers;
