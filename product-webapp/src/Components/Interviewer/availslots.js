import React from "react";
import './availSlots.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";




function Bookedbutton(props)
{

    if(props.slotStatus == 'booked')
    {
                return( <div className='col-md-3'>
                    <lable className='bookedLable'>Booked</lable>
                </div>
                )
            }
            else
            {
                return( <div>
                    <span  className='bookedLable'>Available   </span>
                    <RiDeleteBin6Line onClick={()=>deleteSlot(props.id)} style={{color:'red'}}></RiDeleteBin6Line>
                    {/* <a className='deleteLable'onClick={()=>deleteSlot(props.id)}>Delete</a> */}
                    <i class="bi bi-archive"></i>
                    </div>
                )
            }
}

function deleteSlot(props)
{
    console.log(props);
    axios.delete(`http://localhost:3000/InterviewSlots/${props}`).then((res)=> {
            console.log(res);
    })
    // window.location.reload();
}

const NewscardBoots = (props) =>
{
    return(
        <li>
        <div className='cardDiv border bg-light'>
            <div className='row'>
            <div className='col-md-3'></div>
                <div className='col-md-4'>
                    <p> {props.startTime} - {props.endTime}</p>
                </div>
                <div className='col-md-5'>
                <Bookedbutton slotStatus = {props.slotStatus} id = {props.id}/>
                </div>
            </div>
        </div>
</li>
    )
}


const AvailSlots = (props) => {
    //  console.log(props);
        let today = props.selectedDate;
        let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        const datearray = props.slots.filter((slot)=>{ return slot.slotDate==date
        })
        console.log(datearray.length);
        if(datearray.length == 0)
                { return <div>
                        <h5 className="heading-sub">Selected date is {date}</h5>
                        <h5 className="heading-sub2">No slots Booked</h5>
                        </div> }
    return(
        <div>
            <h5 className="heading-sub">Selected date is {date}</h5>
        <ul className='newsList'>
            {
                
                props.slots.map((slot) => {
                    // console.log(slot.slotDate);
                        
                        if(slot.slotDate == date)
                             return <NewscardBoots startTime={slot.startTime} endTime={slot.endTime} slotDate= {slot.slotDate} slotStatus = {slot.slotStatus} id = {slot.id}/>
                       
                    })
                }
            {/* } */}
        </ul>
        </div>
    )
}



export default AvailSlots;