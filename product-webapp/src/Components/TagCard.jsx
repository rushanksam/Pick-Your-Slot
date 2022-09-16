import React from "react";
import { Card, Modal, Button } from "react-bootstrap";
import "./components.css";
import axios from "axios";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "./SnackBar.css"


function TagCard(props) {

  const [openSnack, setOpenSnack] = useState(
  //   {
  //   vertical: 'top',
  //   horizontal: 'center'
  // }
  false
  );


  const [show, setShow] = useState(false);
  console.log(props);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function tagCancel() {
    console.log(props);

    let data = {
        bookedSlotId: props.bookedSlotId,
        tagMemberEmailId: props.tagMemberEmailId,
        tagMemberName: props.tagMemberName,
        tagTeamName: props.tagTeamName,
        slotBookedDate:props.slotBookedDate,
        slotDate: props.slotDate,
        startTime: props.startTime,
        endTime: props.endTime,
        techTrack: props.techTrack,
        interviewDesc: props.interviewDesc,
        interviewerName: props.interviewerName,
        interviewerEmailId: props.interviewerEmailId,
        slotStatus: "Canceled",
    };

    axios
      .put(`https://pickmyslot.stackroute.io/tagservice/api/v1/updateBookedSlot`, data)
      // .patch(`http://localhost:3001/BookedSlots/${props.id}` , data)
      .then((response) => {
        props.senddata(response);
        console.log(response);
      });

    console.log(props.id);
  }
  function cancelClicked() {
    handleShow();
  }
  function closeClicked() {
    tagCancel();
    handleClose();
    setOpenSnack(true);
  }
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpenSnack(false);
  };

const truncate = (title) => {

return title.slice(0 , 20) + "...";

}
  return (
    <>
      <div className="main-card col-4">
        <Card className="shadow-lg">
          <Card.Body>
            <div className="row">
              <h4 className="tag-name">
                <i class="fa-solid fa-user"></i>
                {props.interviewerName}
              </h4>
              <h4 className="tag-techtrack">{props.techTrack}</h4>
            </div>
            <h4 className="tag-email" title={props.interviewerEmailId}>
              <i class="fa-solid fa-envelope"></i>
              {truncate(props.interviewerEmailId)}
            </h4>

            <div className="row date-time">
              <h4 className="time">
                <i class="fa-solid fa-clock"></i>
                {props.startTime}-{props.endTime}
              </h4>
              <h4 className="date">
                <i class="fa-solid fa-calendar"></i>
                {props.slotDate}
              </h4>
            </div>

            <h5 className="cncl-button">
              {props.slotStatus !== "Canceled" && props.slotStatus !== "Past" && (
                <button
                  type="button"
                  class="cancel-button"
                  onClick={cancelClicked}
                >
                  Cancel
                </button>
              )}
            </h5>
            <Modal
              show={show}
              onHide={handleClose}
              className="tag-cancel-modal"
            >
              <Modal.Header></Modal.Header>

              <Modal.Body>
                <p>Are you sure you want to cancel.</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={closeClicked}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
        <Snackbar
       anchorOrigin={{ vertical: "top", horizontal: "center"  }}
        open={openSnack}
        autoHideDuration={1000}
        message="Canceled"
        onClose={handleToClose}

        // action={
        //   <React.Fragment>
        //     <IconButton
        //       size="small"
        //       aria-label="close"
        //       color="inherit"
        //       onClick={handleToClose}
        //     >
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </React.Fragment>
        // }
      />
      </div>
    </>
  );
}
export default TagCard;
