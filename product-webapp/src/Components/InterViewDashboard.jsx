import React, { useEffect, useState } from "react";
import axios from "axios";
import InterviewCard from "./InterviewCard";
import moment from "moment";
import "./components.css";
import InterviewerHeader from "../Components/Interviewer/interviewer_header";

import Header from "./Header";

function InterviewDashboard() {
  const [interviewer, setInterviewer] = useState([]);
  const [slot, setSlot] = useState([]);
  const [clr, setClr] = useState("");
  const [defaultData, setDefaultData] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const emailId = window.localStorage.getItem('EmailID');

  //const [value] = useState(new Date());

  function filterStatus(slotItem) {
    
    setClr(slotItem);
    const updateStatus = interviewer.filter((currentStatus) => {
      return currentStatus.slotStatus === slotItem;
    });

    setSlot(updateStatus);
    setDefaultData(updateStatus);
  }

  function getData(x) {
    console.log("state lifterd", x);
    update();
  }

  function update() {
   axios.get(`https://pickmyslot.stackroute.io/tagservice/api/v1/${emailId}`)
    // axios.get(`http://localhost:3001/BookedSlots`)
    .then((response) => {
      //console.log(response);
      setInterviewer(response.data);
      setSlot(response.data);
      setDefaultData(response.data);
    });
  }
  const filterDate = (event) => {
    setDate(moment(event.target.value).format("YYYY-MM-DD"));
    let momentDate = moment(event.target.value).format("DD-M-YYYY");

    //setDate(momentDate);
    filter(momentDate);
  };
  const filter = (date1) => {
    let datevar = date1;
    //console.log(date1);
    //console.log(defaultData.slotDate);
    let a = defaultData.filter((response) => {
      return response.slotDate === datevar;
    });
    // console.log(a);
    setSlot(a);
  };

  const resetFilter = () => {
    setDate("");
    update();
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    filterStatus("Booked");
  }, [interviewer]);

  return (
    <>
      {/* <Header /> */}
      <InterviewerHeader/>
      <div className="container">
        <div className="row dashboard">
          <div className="button">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  type="button"
                  className={
                    clr === "Booked"
                      ? "upcoming-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterStatus("Booked");
                  }}
                  aria-current="page"
                >
                  Upcoming
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    clr === "Canceled"
                      ? "cancel-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterStatus("Canceled");
                  }}
                >
                  Canceled
                </a>
              </li>
              <li className="nav-item">
                <a
                  type="button"
                  className={
                    clr === "Past"
                      ? "past-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterStatus("Past");
                  }}
                >
                  Past
                </a>
              </li>
              <form className="search-form form-inline my-2 my-lg-0">
                <l1>
                  {/* <input
                    type="search"
                    placeholder="date"
                    className="search"
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                    }}
                  /> */}
                  <input type="date" value={date} onChange={filterDate} />
                  {/* <DatePick
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                    }}
                  /> */}
                  <button
                    type="button"
                    className="resetButtonInterview"
                    onClick={() => resetFilter()}
                  >
                    Reset
                  </button>
                </l1>
              </form>
            </ul>
          </div>
          {slot.length == 0 && <div className="text-center fs-1">No Data</div>}
          <div className="row">
            {slot
              // .filter((interview) => {
              //   if (dateFilter == "slotDate") {
              //     return interview;
              //   } else if (
              //     interview.slotDate
              //       .toLowerCase()
              //       .includes(dateFilter.toLowerCase())
              //   ) {
              //     return interview;
              //   }
              // })
              .map((interview, key) => {
                return (
                  <>
                    <InterviewCard
                      key={key}
                      senddata={getData}
                      id={interview.id}
                      bookedSlotId={interview.bookedSlotId}
                      tagMemberEmailId={interview.tagMemberEmailId}
                      tagMemberName={interview.tagMemberName}
                      tagTeamName={interview.tagTeamName}
                      interviewerName={interview.intervierName}
                      interviewerEmailId={interview.interviewerEmailId}
                      interviewDesc={interview.interviewDesc}
                      techTrack={interview.techTrack}
                      slotBookedDate={interview.slotBookedDate}
                      slotDate={interview.slotDate}
                      startTime={interview.startTime}
                      endTime={interview.endTime}
                      slotStatus={interview.slotStatus}
                     />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default InterviewDashboard;
