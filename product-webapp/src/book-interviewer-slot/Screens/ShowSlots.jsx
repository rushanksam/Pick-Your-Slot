import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HeaderBar from '../../tech-tracks/Components/HeaderBar';
import SlotsCard from '../Components/SlotsCard';
import {
  Row
}  from 'react-bootstrap'
const ShowSlots = () => {
  const location = useLocation();
  const [slots,setSlots]=useState([]);
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData=()=>{
    axios.get(`http://localhost:3001/InterviewSlots?interviewerName=${location.state.data}`).then((res) => {
      console.log("Response",res.data);
      return res.data;
      
  }).then(res => {
    console.log("Set",res);
    setSlots(res);
  });
}
  return (
    <>
    <HeaderBar />
      <h1 style={{textAlign:"left",marginLeft:"10%",marginTop:"10%"}}>Book {location.state.data}'s Slot</h1>
      <div
        className="p-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width:"100%",
          marginLeft:"10%"
        }}
      >
        {!slots[0]?<h3>No Slots at the moment..!!</h3>:
        <Row >
{
  slots.map((data => 
  <div key={data.id}  style={{width:"400px"}}>
    <SlotsCard data={data}></SlotsCard></div>)

  )}
</Row>
}
     
      </div>
    </>
  )
}

export default ShowSlots