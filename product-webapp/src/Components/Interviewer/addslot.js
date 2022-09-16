import React,{useEffect, useState} from "react";
// import '../availSlots.css'
import 'bootstrap/dist/css/bootstrap.css'
import './addslot.css';
import axios from 'axios';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { Domain } from '../../domain/Domain'
{/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> */}

function Addslot(props)
{
    //  const navigate = useNavigate();
    const navigate = useNavigate();
    let today = props.selectedDate;
    const emailId = window.localStorage.getItem('EmailID');
    const InterName = window.localStorage.getItem("InterviewerName");
    let selectedDate=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const [date,setDate] = useState(new Date());
    const [startTime,SetstartTime] = useState(0);
    const [endTime,SetendTime] = useState(0);

    const addSlottoserver = () =>{
        console.log(InterName)
        const newSlot = {
            slotId:"",
            emailId:emailId,
            interviewerDesc:"Description",
            techTrack:"Backend",
            slotDate: selectedDate,
            startTime: startTime.value ,
            endTime: endTime.value,
            interviewerName:InterName,
            slotStatus: "Available"
        }
        console.log(startTime.value);
        axios.post(`https://pickmyslot.stackroute.io/interviewerservice/api/v1/newSlot`, newSlot)
        .then(response => console.log(response));

        // window.location.reload();
    }
    const options = [
        { value: '6am', label: '6am' },
        { value: '7am', label: '7am' },
        { value: '8am', label: '8am' },
        { value: '9am', label: '9am' },
        { value: '10am', label: '10am' },
        { value: '11am', label: '11am' },
        { value: '12pm', label: '12pm' },
        { value: '1pm', label: '1pm' },
        { value: '2pm', label: '2pm' },
        { value: '3pm', label: '3pm' },
        { value: '4pm', label: '4pm' },
        { value: '5pm', label: '5pm' },
        { value: '6pm', label: '6pm' },
        { value: '7pm', label: '7pm' },
        { value: '8pm', label: '8pm' },
        { value: '9pm', label: '9pm' },
        { value: '10pm', label: '10pm' },
        { value: '11pm', label: '11pm' }
      ]
  
    return(
        <div className='cardDiv border bg-light'>
            <h5>ADD SLOTS</h5>
            <div className='row'>
            <div className='col-md-2'></div>
                <div className='col-md-3'>
                <Select placeholder={'Start Time'} maxMenuHeight={50} options={options} onChange={(e)=>SetstartTime(e)}></Select>
                </div>
                <div className='col-md-3'>
                <Select placeholder={'End Time'} maxMenuHeight={50} options={options} onChange={(e)=>SetendTime(e)}></Select>
                </div>
                <div className='col-md-1'>
                {/* <Select placeholder={'Endtime'} maxMenuHeight={100} options={options} onChange={(e)=>SetstartTime(e)}></Select> */}
                </div>
                <div className='col-md-3'>
                    <button className='btn btn-success' onClick={addSlottoserver}>ADD SLOT</button>
                </div>
            </div>
        </div>
    )
}

export default Addslot;