import React, { useEffect, useState } from 'react';
import "../App.css";
import TagTeamDashboardCard from './tagTeamDashboardCard';
import HeaderBar from "../tech-tracks/Components/HeaderBar";
import axios from 'axios';

export default function TagTeamReport(props) {

    const tagTeamName = window.localStorage.getItem("tagTeamName");

    const year = new Date().getFullYear();
    let duration = (new Date()).getFullYear() - 2010;
    let years = Array.from(new Array(duration - 1), (val, index) => year - index);

    let yearOptions = years.map((year, index) => {
        return <option key={`year${index}`} value={year}>{year}</option>
    })

    const months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December']

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let monthOptions = months.map((month, index) => {
        return <option key={`month${index}`} value={index}>{month}</option>
    })

    let [formMonth, setMonth] = useState(monthNames[new Date().getMonth()]);
    let [formYear, setYear] = useState(new Date().getFullYear());
    let [slotsProvided, setSlotsProvided] = useState(0);
    let [slotsBooked, setSlotsBooked] = useState(0);
    let [slotsBookedByTeam, setSlotsBookedByTeam] = useState(0);
    let [slotsMissed, setSlotsMissed] = useState(0);
    let [teamName, setTeamName] = useState("");


    useEffect(() => {
        let year = formYear;
        let month = formMonth;

        // axios
        //     .get(`http://localhost:3001/registerTagTeam/?email=${email}`,)
        //     .then((resp) => {
        //         setTeamName(resp.data[0].teamName);
        //     })
        //     .catch((error) => {
        //         //console.log(error);
        //     });

        axios
            .get(`https://pickmyslot.stackroute.io/interviewerservice/api/v1/interviewer/${year}/${month}`)
            .then((resp) => {
                setSlotsProvided(resp.data.alllist);
                setSlotsBooked(resp.data.bookedslot);
                setSlotsMissed(resp.data.notbooked);
                

            })
            .catch((error) => {
                //console.log(error);
            });

            axios
            .get(`https://pickmyslot.stackroute.io/tagservice/api/v1/tag/${year}/${month}/${tagTeamName}`)
            .then((resp) => {
                setSlotsBookedByTeam(resp.data);

            })
            .catch((error) => {
            });

    }, [])

    function handleSubmit(event) {
        let year = event.currentTarget.elements.year.value;
        let month = monthNames[event.currentTarget.elements.month.value];
        let teamParam = teamName;
        setMonth(month);
        setYear(year);
        //console.log("DAta");

        axios
            .get(
                `https://pickmyslot.stackroute.io/interviewerservice/api/v1/interviewer/${year}/${month}`
            )
            .then((resp) => {
                if (resp.alllist > 0) {
                    setSlotsProvided(resp.data.alllist);
                    setSlotsBooked(resp.data.bookedslot);
                    setSlotsBookedByTeam(0);
                    setSlotsMissed(resp.data.notbooked);
                } else {
                    setSlotsProvided(resp.alllist);
                    setSlotsBooked(resp.bookedslot);
                    setSlotsBookedByTeam(resp.data[0].slotsBookedByTeam);
                    setSlotsMissed(resp.notbooked);
                }

            });
        event.preventDefault()
    }


    return (<>
        <div className="container">
            <HeaderBar />
            <div className="row">
                <form onSubmit={handleSubmit} className="mt-3 mb-3 col-md-12">
                    <div className="row" id="dashboard-form">

                        <div className="col-md-5">
                            <select name="year" className="form-select" aria-label="Default select example">
                                <option defaultValue>Select year</option>
                                {yearOptions}
                            </select>
                        </div>
                        <div className="col-md-5">
                            <select name="month" className="form-select" aria-label="Default select example">
                                <option defaultValue>Select month</option>
                                {monthOptions}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </div>

                    </div>
                </form>
                <div id="dashboard-row">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mb-3">Report for {formMonth} - {formYear}</h4>
                        </div>
                        <div className="col-md-6 col-xl-6">
                            <TagTeamDashboardCard title={"Number of slots provided"} number={slotsProvided} background={" bg-c-blue "} />
                        </div>
                        <div className="col-md-6 col-xl-6">
                            <TagTeamDashboardCard title={"Number of slots booked"} number={slotsBooked} background={" bg-c-green "} />
                        </div>
                        <div className="col-md-6 col-xl-6">
                            <TagTeamDashboardCard title={"Number of slots booked by team"} number={slotsBookedByTeam} background={" bg-c-yellow "} />
                        </div>
                        <div className="col-md-6 col-xl-6">
                            <TagTeamDashboardCard title={"Number of slots missed without booking"} number={slotsMissed} background={" bg-c-pink "} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>)

}