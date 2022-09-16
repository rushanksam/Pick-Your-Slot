import React,{useState,useEffect} from "react";
// import AvailSlots from "./availslots";
import 'bootstrap/dist/css/bootstrap.css'
// import PositionedSnackbar from "../../Components/SnackBar";
import PositionedSnackbar from "../../login-register/Components/SnackBar";
// import Addslot from "./addslot";
import InterviewerHeader from "./interviewer_header";
// import MyCalender from "./calender"
// import {Snackbar} from "@material-ui/core/Snackbar";
import { useFormik } from "formik";
import './updateslot.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import Header from "../../Components/Header";

function UpdateSlot()
{
    const [Interviews,SetInterviews] = useState([]);
    const [errormsg , SetErrorMsg] = useState();
    const [loading, setLoading] = useState(true);
    // localStorage.setItem('EmailID','Bob');
    const emailId = window.localStorage.getItem('EmailID');
    const InterName = window.localStorage.getItem("InterviewerName");
    const techTrack = window.localStorage.getItem("techTrack");
    // console.log("session element is " + emailId);
    // const fetchData = ''
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
          showSnackBar: false,
          message: "",
        }});
    const fetchData = async () =>{
    //   const response = await fetch('http://localhost:3000/InterviewSlots');
    const response = await fetch(`https://pickmyslot.stackroute.io/interviewerservice/api/v1/${emailId}`);
      const body = await response.json();
      const InterviewTransform = body.map(interviewdetail => {
          return {
              startTime:interviewdetail.startTime,
              endTime : interviewdetail.endTime,
              slotDate:interviewdetail.slotDate,
              slotStatus: interviewdetail.slotStatus,
              id:interviewdetail.slotId
          };
      });
      SetInterviews(InterviewTransform);
  }

    
    useEffect(()=>{
 
    fetchData()
     },[])
     
    const [date, setDate] = useState(new Date(),'dd/mm/yyyy');
    const onDateChange = (newdate) =>{
      setDate(newdate);
    }
    function MyCalendar() {
      return (
        <div>
          <Calendar onChange={onDateChange} value={date} minDate={new Date()}/>
        </div>
      );
    }

    //------------------------------------------------

  
    function DisplayErrorMsg()
    {
        return <span className="errorMsg">{errormsg}</span>
    }

    function Addslot(props)
    {
            const [startTime,SetstartTime] = useState(0);
            const [endTime,SetendTime] = useState(0);
            let today = props.selectedDate;
            let selectedDate=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
            const addSlottoserver = () =>{
                if(endTime.value - startTime.value == 1)
                {
                const newSlot = {
                    "slotId":"",
                    "emailId":emailId,
                    "interviewerName":InterName,
                    "interviewerDesc":"Description",
                    "techTrack":techTrack,
                    "slotDate": selectedDate,
                    "startTime": covertTo12hrs(startTime.value) ,
                    "endTime": covertTo12hrs(endTime.value),
                    "slotStatus": "Available"
                }
                axios.post('https://pickmyslot.stackroute.io/interviewerservice/api/v1/newSlot', newSlot)
                // axios.post('http://localhost:3000/InterviewSlots', newSlot)
                .then(response => {
                    formik.setFieldValue("showSnackBar",true);
                    formik.setFieldValue("message","Slot Added Successfully");
                }).catch(err =>{
                    formik.setFieldValue("showSnackBar",true);
                    formik.setFieldValue("message","Slot already present");
                });
                setTimeout(fetchData,500);
                //  fetchData();
                // window.location.reload();
                // Interviews = '';
                // formik.setDuration(20);
                setTimeout(()=>{formik.setFieldValue("showSnackBar",false)},2000);
                // formik.setFieldValue("showSnackBar",false);
                SetErrorMsg("");
                }
                else
                {

                    if(startTime.value == undefined)
                    {
                    SetErrorMsg('*select start time first');
                    return;
                    }
                    if(endTime.value == undefined)
                    {
                    SetErrorMsg('*select end time');
                    return;
                    }
                    
                    if(endTime.value - startTime.value > 1)
                    {
                        SetErrorMsg('*slot duration is greater than 1hr');
                    }
                    else
                    {
                        SetErrorMsg('*end time is greater than start time');
                    }
                    // console.log("slot is greater than 1hr");
                }

            }

            const covertTo12hrs = (e) => {
                let value = '';
                switch(e){
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:value = e + 'am';
                            break;
                    case 12:value = e + 'pm';
                            break;
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:value = e-12 +'pm';           
                    }
                return value;
            }
                const options = [
                    { value: 6, label: '6am' },
                    { value: 7, label: '7am' },
                    { value: 8, label: '8am' },
                    { value: 9, label: '9am' },
                    { value: 10, label: '10am' },
                    { value: 11, label: '11am' },
                    { value: 12, label: '12pm' },
                    { value: 13, label: '1pm' },
                    { value: 14, label: '2pm' },
                    { value: 15, label: '3pm' },
                    { value: 16, label: '4pm' },
                    { value: 17, label: '5pm' },
                    { value: 18, label: '6pm' },
                    { value: 19, label: '7pm' },
                    { value: 20, label: '8pm' },
                    { value: 21, label: '9pm' },
                    { value: 22, label: '10pm' },
                    { value: 23, label: '11pm' }
                  ]
              
                  
            
              return(
                  <div className='cardDivAvail border bg-light'>
                      <h5>ADD SLOTS</h5>
                      <div className='row'>
                      <div className='col-md-2'></div>
                          <div className='col-md-3'>
                          <Select placeholder={'Start Time'} maxMenuHeight={100} options={options} onChange={(e)=>SetstartTime(e)}></Select>
                          </div>
                          <br></br>
                          <div className='col-md-3'>
                          <Select placeholder={'End Time'} maxMenuHeight={100} options={options} onChange={(e)=>SetendTime(e)}></Select>
                          <br></br>
                          <DisplayErrorMsg/>
                          </div>
                          <div className='col-md-1'></div>
                          
                          <div className='col-md-3'>
                                    <button className='btn btn-success' onClick={()=>  addSlottoserver()}>ADD SLOT</button>
                                </div>
                      </div>
                  </div>
              )
      }

////////////////////////////////Avail slots/////////////////////////////////////////////////////////////////////////////

function Bookedbutton(props)
{
    
    if(props.slotStatus == 'Booked')
    {
                return( <div className='col-md-3'>
                    <lable className='bookedLable'>Booked</lable>
                </div>
                )
            }
            else
            {
                return(  <div className='row'>
                     <div className='col-md-5'>
                    <span  className='bookedLable'>Available   </span>
                    </div>
                    <div className='col-md-5'></div>
                    <div className='col-md-2'>
                    {/* <RiDeleteBin6Line onClick={()=>deleteSlot(props.id)} style={{color:'red'}}></RiDeleteBin6Line> */}
                    <ImCross onClick={()=>deleteSlot(props.id)} style={{color:'red'}}></ImCross>
                    {/* <a className='deleteLable'onClick={()=>deleteSlot(props.id)}>Delete</a> */}
                    {/* <i class="bi bi-archive"></i> */}
                    </div>
                    </div>
                )
            }
}

function deleteSlot(props)
{
    console.log(props);
    axios.delete(`https://pickmyslot.stackroute.io/interviewerservice/api/v1/${props}`).then((res)=> {
            console.log(res);
    })
    setTimeout(fetchData,200);
}

const NewscardBoots = (props) =>
{
    return(
        <li>
        <div className='cardDiv border bg-light'>
            <div className='row'>
            <div className='col-md-1'></div>
                <div className='col-md-4'>
                    <p> {props.startTime} - {props.endTime}</p>
                </div>
                <div className='col-md-5'>
                <Bookedbutton slotStatus = {props.slotStatus} id = {props.id}/>
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
</li>
    )
}


const AvailSlots = (props) => {
        let today = props.selectedDate;
        console.log(today.getMonth());
        let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        const datearray = props.slots.filter((slot)=>{ return slot.slotDate==date
        })
        if(datearray.length == 0)
                { return <div>
                        <h5 className="heading-sub-update">Selected date is {date}</h5>
                        <h5 className="heading-sub2">No slots Available</h5>
                        </div> }
    return(
        <div>
            <h5 className="heading-sub-update">Selected date is {date}</h5>
        <ul className='newsList'>
            {
                props.slots.map((slot) => {
                        if(slot.slotDate == date)
                             return <NewscardBoots startTime={slot.startTime} endTime={slot.endTime} slotDate= {slot.slotDate} slotStatus = {slot.slotStatus} id = {slot.id}/>
                    })
                    
                }
            
        </ul>
        </div>
    )
}
// -------------------------------------------------------------------------------
     return(
        <React.Fragment>
        <div className='container'>
       {/* <Header/> */}
       <InterviewerHeader/>
       {formik.values.showSnackBar && <PositionedSnackbar title={formik.values.message} showSnackBar={formik.values.showSnackBar} />}
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <div className='row rowC'>
        <div className='col-md-1'></div>
          <div className='col-md-4'>
            <h5>Select date to view your Interviews</h5>
          <MyCalendar/>
          </div>
          <div className='col-md-6'>
          <AvailSlots selectedDate={date} slots= {Interviews}/>
          </div>
        </div> 
        <div className="row">
        <div className='col-md-1'></div>
            <div className="col-md-10">
            <Addslot selectedDate={date}/>
            </div>
        </div>
        <br></br><br></br>
        <br></br><br></br>
        {/* <br></br><br></br> */}
        </div>
        </React.Fragment>
     )
}

export default UpdateSlot;
