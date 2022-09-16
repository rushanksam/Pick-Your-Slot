import Card from "react-bootstrap/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cards.css";
const Cards = (props) => {
  let navigate = useNavigate();
  const showInterviewers = (interviewer) => {
    //   alert("Show Interviewers");
    //   navigate("/interviewers", { replace: true });
    navigate("/interviewers", { state: { data: interviewer }, replace: false });
  };
  return (
    <Card
      className="shadow-lg p-3 mb-5 bg-white rounded showCard"
      border="secondary"
      onClick={() => showInterviewers(props.data.techTrack)}
    >
      <Card.Body>
        <img
          src={props.data.source}
          alt="logo"
          style={{ width: "60px", height: "60px" }}
        />

        <Card.Text style={{ fontSize: "30px" }}>
          {props.data.techTrack}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
