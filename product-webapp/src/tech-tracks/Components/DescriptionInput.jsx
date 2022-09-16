import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DescriptionInput = (props) => {
  let [interviewDescription, setInterviewDescription] = useState("");
  const { data: data, postData: postData } = props;
  return (
    <>
      <input
        type="text"
        maxLength={50}
        placeholder="Interview Description (upto 50 characters)"
        value={interviewDescription}
        onChange={(e) => setInterviewDescription(e.target.value)}
        style={{ width: "80%" }}
      />
      <Button
        style={{ marginLeft: "30px" }}
        onClick={() => postData(props.data, interviewDescription)}
      >
        Book Slot
      </Button>
    </>
  );
};
export default DescriptionInput;
