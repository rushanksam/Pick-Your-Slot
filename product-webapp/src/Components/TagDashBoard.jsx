import React, { useEffect, useState } from "react";
import axios from "axios";
import TagCard from "./TagCard";
import HeaderBar from "../tech-tracks/Components/HeaderBar";
import moment from "moment";
import "./components.css";

function TagDashboard() {
  const [tag, setTag] = useState([]);
  const [tagslot, setTagSlot] = useState([]);
  const [clr, setClr] = useState("");
  const [defaultDate, setDefaultDate] = useState("");
  const [techTrack, setTech] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const emailId = window.localStorage.getItem('EmailID');
  //const [defaultTech, setDefaultTech] = useState("");

  const filterItem = (slotItem) => {
    setClr(slotItem);
    const updateStatus = tag.filter((currentStatus) => {
      return currentStatus.slotStatus === slotItem;
    });

    setTagSlot(updateStatus);
    setDefaultDate(updateStatus);
    //setDefaultTech(updateStatus);
  };
  function getData(x) {
    console.log("state lifterd", x);
    updatetag();
  }

  function updatetag() {
    axios.get(`https://pickmyslot.stackroute.io/tagservice/api/v1/tag/${emailId}`)
    // axios.get(`http://localhost:3001/BookedSlots`)
    .then((response) => {
      //console.log(response);
      setTag(response.data);
      setTagSlot(response.data);
      setDefaultDate(response.data);
      //setDefaultTech(response.data);
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

    let a = defaultDate.filter((response) => {
      return response.slotDate === datevar;
    });

    setTagSlot(a);
  };
  // const filterTechTrack = (event) => {

  //   setTech(event.target.value);
  //   filterTech(event.target.value);
  // };
  // const filterTech = (tech1) => {

  //   let techvar = tech1;
  //   let b = defaultTech.filter((response) => {
  //     return response.techTrack.toLowerCase().includes(techvar.toLowerCase()) || response.intervierName.toLowerCase().includes(techvar.toLowerCase());
  //   });

  //   setTagSlot(b);

  // };

  function resetFilter() {
    setTech("");
    setDate("");
    updatetag();
  }

  useEffect(() => {
    updatetag();
  }, []);

  useEffect(() => {
    filterItem("Booked");
  }, [tag]);

  return (
    <div>
      <HeaderBar />
      <div className="container">
        <div className="row dashboard">
          <div className="button">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  type="button"
                  class={
                    clr === "Booked"
                      ? "upcoming-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterItem("Booked");
                  }}
                  aria-current="page"
                >
                  Upcoming
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    clr === "Canceled"
                      ? "cancel-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterItem("Canceled");
                  }}
                >
                  Canceled
                </a>
              </li>
              <li class="nav-item">
                <a
                  type="button"
                  class={
                    clr === "Past"
                      ? "past-btn btn btn-secondary "
                      : "btn btn-secondary nav-link"
                  }
                  onClick={() => {
                    filterItem("Past");
                  }}
                >
                  Past
                </a>
              </li>
              <form className="search-form-tag form-inline my-2 my-lg-0">
                <l1 className="search-tag">
                  {/* <input
                  type="search"
                  placeholder="date"
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                  }}
                /> */}
                  {/* <DatePick value={value}
                  onChange={filterDate}
                /> */}
                  <input type="date" value={date} onChange={filterDate} />
                </l1>
                <l1>
                  <input
                    className="search-tag-tech"
                    value={techTrack}
                    type="search"
                    placeholder="search"
                    onChange={(e) => setTech(e.target.value)}
                  />
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={filterTechTrack}
                  >
                    <option>Tech Track</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select> */}
                </l1>
                <button
                  type="button"
                  className="resetButton"
                  onClick={() => resetFilter()}
                >
                  Reset
                </button>
              </form>
            </ul>
          </div>
          {tagslot.length === 0 && (
            <div className="text-center fs-1">No Data</div>
          )}

          <div className="row">
            {tagslot
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
              .filter((tag) => {
                if (techTrack == "techTrack" && techTrack == "intervierName") {
                  return tag;
                } else if (
                  tag.techTrack.toLowerCase().includes(techTrack.toLowerCase())
                ) {
                  return tag;
                } else if (
                  tag.intervierName
                    .toLowerCase()
                    .includes(techTrack.toLowerCase())
                ) {
                  return tag;
                }
              })

              .map((tags) => {
                return (
                  <>
                    <TagCard
                      senddata={getData}
                      id={tags.id}
                      bookedSlotId={tags.bookedSlotId}
                      tagMemberEmailId={tags.tagMemberEmailId}
                      tagMemberName={tags.tagMemberName}
                      tagTeamName={tags.tagTeamName}
                      interviewerName={tags.interviewerName}
                      interviewerEmailId={tags.interviewerEmailId}
                      interviewDesc={tags.interviewDesc}
                      techTrack={tags.techTrack}
                      slotBookedDate={tags.slotBookedDate}
                      slotDate={tags.slotDate}
                      startTime={tags.startTime}
                      endTime={tags.endTime}
                      slotStatus={tags.slotStatus}
                    />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TagDashboard;
