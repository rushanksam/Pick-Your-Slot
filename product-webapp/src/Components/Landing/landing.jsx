import React from "react";
import Header from "./header";
import Footer from "./footer";
import Details from "./details";


function Landing()
{
    // const emailId = window.localStorage.getItem('EmailID');
    // console.log("email in landing page " + emailId );
    return (
        <div>
            <Header/>
            <Details/>
            <Footer/>
        </div>
        )
}


export default Landing