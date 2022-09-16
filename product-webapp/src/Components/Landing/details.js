import React from "react";
import './details.css';
import {useNavigate} from 'react-router-dom';
import img1 from '../../img/welcomeProject.jpg'
import img2 from '../../img/download.jpeg'
import img3 from '../../img/interview_waiting.jpg'
import img4 from '../../img/img4.jpeg'

function Details()
{


    const navigate = useNavigate();


    function getLogin()
    {
        navigate('/');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="heading-main">Welcome to Pickyourslot</h2>
                    <span className="desc-div">
                    Now manage your time slots for interview with one click.<br></br>
                     Want to connect with an interviewer? We can help you.<br></br>
                      Want to schedule interview with TAG Member? 
                      We can help you too.
                      The recruiter, as well as the candidate, 
                      can schedule or reschedule their interview as per mutual availability.
                      <br></br>
                      {/* Integrate calendars: Your calendar is automatically updated any time an interview 
                      slot gets booked and both the recruiter and the applicant are notified as soon as a meeting is confirmed, 
                      rescheduled, or canceled. */}
                    </span>
                    <br></br> <br></br>
                    {/* <button className="btn btn-primary btnsign">Sign Up as TAG Member/Interviewer</button> */}
                    <br></br>
                    {/* <button className="btn btn-primary btnsign">Sign Up as TAG Member</button> */}

                </div>
                <div className="col-md-5">
                    <img className="welcomeLogo" src={img1}></img>
                </div>

            </div>
            <br></br>
            <br></br>
            
            <br></br>
            {/* style={{'display':'flex' ,'flex-direction': 'column-reverse;'}} */}
            <div className="row desktopScreen">
            <div className="col-md-5">
                    <img className="welcomeLogo" src={img2}></img>
                </div>
                <div className="col-md-7">
                     <h3 className="heading-sub">Some of our Features</h3>
                     <ul>
                         <li>Bridging the gap between interviewer and Tag Members.</li>
                         <li>Book a slot at your own wish.</li>
                         <li>Update/Cancel the slot in few clicks.</li>
                         <li>As a tag team Member,track and see all the slots(day wise) provided by different interviewer</li>
                         <li>See your progress and past interview performance</li>
                         <li>Book/Update/Cancel a slot and we'll notify on your behalf. </li>
                         {/* <li> </li> */}
                        
                     </ul>
                     {/* <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
                    ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                     nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                      in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                    </span> */}
                </div>
            </div>
            <div className="row smallscreen">
            
                <div className="col-md-7">
                     <h3 className="heading-sub">Some of our Features</h3>
                     <ul>
                         <li>Bridging the gap between interviewer and Tag Members.</li>
                         <li>Book a slot at your own wish.</li>
                         <li>Update/Cancel the slot in few clicks.</li>
                         <li>As a tag team Member,track and see all the slots(day wise) provided by different interviewer</li>
                         <li>See your progress and past interview performance</li>
                         <li>Book/Update/Cancel a slot and we'll notify on your behalf. </li>
                         {/* <li> </li> */}
                        
                     </ul>
                     {/* <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
                    ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                     nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                      in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                    </span> */}
                </div>
                <div className="col-md-5">
                    <img className="welcomeLogo" src={img2}></img>
                </div>
            </div>
            <br></br>
            <br></br>
            
            <div className="row maindiv3">
            <div className="col-md-7">
                     <h3 className="heading-sub">Why Pickyourslot...??</h3>
                     <br>
                     </br>
                     <h5> Save Engineering Hours</h5>
                     <span> The interview process itself, plus the switching costs
                          between conducting the interview and coding tasks, eats up
                           a lot of time for engineers. Ensuring engineers are productive
                            and motivated is a real concern for high-growth or unicorn startups in particular.
                            </span>
                        <h5>Open up the Funnel</h5>
                        <span>
                        Related to the above point, 
                            you’re no longer capped by the number of available interviewer 
                            hours in order to conduct technical interviews.
                        </span>
                            
                </div>
            <div className="col-md-5">
                    <img className="welcomeLogo" src={img4}></img>
                </div>
                
            </div>

        </div>
    )
}

export default Details;