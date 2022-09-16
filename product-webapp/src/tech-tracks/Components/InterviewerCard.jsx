import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-date-picker";
import DescriptionInput from "./DescriptionInput";
import "./InterviewerCard.css";

const InterviewerCard = (props) => {
  const [modalShow, setModalShow] = useState({
    show: false,
    name: "",
    email: "",
  });
  const [open, setOpen] = useState(false);

  const [value, onChange] = useState("");
  const emailId = window.localStorage.getItem("EmailID");
  const tagTeamName = window.localStorage.getItem("tagTeamName");
  const tagMemberName = window.localStorage.getItem("tagMemberName");
  const postData = (data, description) => {
    axios
      .post("https://pickmyslot.stackroute.io/tagservice/api/v1/bookedSlot", {
        // id: data.id,
        bookedSlotId: data.slotId,
        tagMemberEmailId: emailId,
        tagMemberName: tagMemberName,
        tagTeamName: tagTeamName,
        slotBookedDate:
          new Date().getDate() +
          "-" +
          new Date().getMonth() +
          "-" +
          new Date().getFullYear(),
        slotDate: data.slotDate,
        startTime: data.startTime,
        endTime: data.endTime,
        techTrack: data.techTrack,
        interviewDescription: description,
        interviewerName: data.interviewerName,
        interviewerEmailId: data.emailId,
        slotStatus: "Booked",
      })
      .then((response) => {
        if(response.status===201){
          axios.put(`https://pickmyslot.stackroute.io/interviewerservice/api/v1/updateSlot`,{
            slotId: data.slotId,
            emailId: data.emailId,
            interviewerName: data.interviewerName,
            slotDate: data.slotDate,
            startTime: data.startTime,
            endTime: data.endTime,
            interviewerDesc: description,
            techTrack: data.techTrack,
            slotStatus: "Booked"
          })
        }
        setModalShow({ show: false });
        setOpen(true);
      })

      .catch((error) => {
        alert("Some error occured please try again later");
        // console.log("ERrror", error);
      });
  };

  const ShowSlotsModal = (props) => {
    const [slots, setSlots] = useState([]);
    // console.log("Name",props)
    useEffect(() => {
      fetchData();
    }, [modalShow.name]);

    function convertDate(str) {
      if (str) {
        var months = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ];
        var day = str.getDate();
        var year = str.getFullYear();
        var month = months[str.getMonth()];
        var newDate = day + "-" + month + "-" + year;
        return newDate;
      } else {
        onChange("");
      }
    }
    const fetchData = () => {
      //`http://localhost:3001/InterviewSlots?interviewerName=Amit`
      axios
        .get(
          `https://pickmyslot.stackroute.io/interviewerservice/api/v1/availableSlot/${modalShow.email}`
        )
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          // console.log("Set",res);
          setSlots(res);
        });
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // onHide={()=>closeModal()}
        // onExit={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data}'s Slots
          </Modal.Title>
        </Modal.Header>
        {!slots[0] ? (
          <h4>No Slots at the moment..!!</h4>
        ) : (
          <Modal.Body className="modalBody">
            <i className="fa-solid fa-calendar calendarIcon"></i>
            <DatePicker
              onChange={onChange}
              value={value}
              dateFormat="dd-MMM-yyyy"
            />
            {/* {console.log("value",value)} */}
            {value === ""
              ? slots.map((data) => (
                  <div>
                    <Accordion defaultActiveKey="1">
                      <Accordion.Item eventKey="0" style={{ margin: "15px" }}>
                        <Accordion.Header>
                          <h5>{data.slotDate}</h5>
                          <p className="accordianHeader">
                            {data.startTime} - {data.endTime}
                          </p>
                        </Accordion.Header>
                        <Accordion.Body className="accordianBody">
                          <DescriptionInput data={data} postData={postData} />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))
              : slots
                  .filter((data) => data.slotDate === convertDate(value))
                  .map((filteredData) => (
                    <div>
                      <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0" style={{ margin: "15px" }}>
                          <Accordion.Header>
                            <h5>{filteredData.slotDate}</h5>
                            <p className="accordianHeader">
                              {filteredData.startTime} - {filteredData.endTime}
                            </p>
                          </Accordion.Header>
                          <Accordion.Body className="accordianBody">
                            <DescriptionInput
                              data={filteredData}
                              postData={postData}
                            />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModal = () => {
    onChange("");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div>
        <Card
          className="shadow-lg p-3 mb-5 bg-white rounded cardDisplay"
          border="secondary"
          onClick={() =>
            setModalShow({
              show: true,
              name: props.data.interviewerName,
              email: props.data.interviewerEmailId,
            })
          }
        >
          <Card.Body className="cardBody">
            <Card.Text className="cardText">
              <div className=".cardDiv">
                {/* change String to "" */}
                {props.data.profileImage === "" ? (
                  <img
                    src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
                    alt="Profile"
                    className="profileImage"
                  />
                ) : (
                  <img
                    src={props.data.profileImage}
                    alt="Profile"
                    className="profileImage"
                  />
                )}
                <br />
                <div>
                  <h3>{props.data.interviewerName}</h3>
                </div>
                <br />
                <div>
                  {props.data.phoneNumber===""?(
                  <p className="cardDetails">
                    <FaPhoneAlt color="rgb(105, 105, 105)" />{" "}
                    Not Available
                  </p>):(
                    <p className="cardDetails">
                    <FaPhoneAlt color="rgb(105, 105, 105)" />{" "}
                    {props.data.phoneNumber}
                  </p>
                  )}
                </div>
                <br />
                <div>
                {props.data.workLocation===""?(
                   <p className="cardDetails">
                   <FaMapMarkerAlt color="rgb(105, 105, 105)" />{" "}
                   Not Available
                 </p>):(
                     <p className="cardDetails">
                     <FaMapMarkerAlt color="rgb(105, 105, 105)" />{" "}
                     {props.data.workLocation}
                   </p>
                  )}
                </div>
                <br />
                <div>
                  <p className="cardDetails">
                    <FaEnvelope color="rgb(105, 105, 105)" />{" "}
                    {props.data.interviewerEmailId}
                  </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <ShowSlotsModal
        show={modalShow.show}
        data={modalShow.name}
        onHide={() => {
          setModalShow(false);
          closeModal();
        }}
      />
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Inteview booked successfully!!!"
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default InterviewerCard;
