import React from "react";
import { Row } from "react-bootstrap";
import Cards from "../Components/Cards";
import HeaderBar from "../Components/HeaderBar";
import "./TechTracks.css";
const TechTracks = () => {
  let techTracksArr = [
    {
      id: 1,
      techTrack: "JavaScript",
      source:
        "https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png",
    },
    {
      id: 2,
      techTrack: "Full Stack",
      source:
        "https://www.xbytesolutions.com/assets/img/services/fullstack-development.png",
    },
    {
      id: 3,
      techTrack: "Backend",
      source:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/backend-developer-1-478025.png",
    },
    {
      id: 4,
      techTrack: "Java",
      source:
        "https://i.pinimg.com/originals/e9/94/61/e99461fdd5b3db8bdb3081d8acf5e524.png",
    },
    {
      id: 5,
      techTrack: "Spring",
      source: "https://spring-petclinic.github.io/images/logo-spring.png",
    },
    {
      id: 6,
      techTrack: "React",
      source:
        "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
    },
    {
      id: 7,
      techTrack: "Angular",
      source:
        "https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg",
    },
    {
      id: 8,
      techTrack: "Python",
      source:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    },
  ];

  return (
    <>
      <HeaderBar />
      <div>
        {" "}
        <p className="heading">List of TechTracks</p>
      </div>
      <div className="p-4 techtracksDisplay">
        <Row>
          {techTracksArr.map((data) => (
            <div key={data.id} className="col-6">
              <Cards data={data}></Cards>
            </div>
          ))}
        </Row>
      </div>
      <div>
        <p className="foot">Click a tech track to book a slot</p>
      </div>
    </>
  );
};

export default TechTracks;
