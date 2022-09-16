import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginContainer from "./login-register/Screens/Login/index";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import TechTracks from "./tech-tracks/Screens/TechTracks";
import Interviewers from "./tech-tracks/Screens/Interviewers";
import UpdateSlot from "./Components/Interviewer/updateslots";
import InterViewDashboard from "./Components/InterViewDashboard";
import TagDashBoard from "./Components/TagDashBoard";
import "font-awesome/css/font-awesome.min.css";
import Landing from "./Components/Landing/landing"
import TagTeamReport from "./dashboard/tagTeamReport";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<LoginContainer />} />
        </Route>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/techTracks" element={<TechTracks />} />
     
        <Route path="/interviewers" element={<Interviewers />} />
        <Route path="/interviewDashboard" element={<InterViewDashboard />} />

        <Route path="/tagDashboard" element={<TagDashBoard />} />
        <Route path="/myavailability" element={<UpdateSlot />} />
        <Route path="/platform" element={<Landing />} />
        <Route index element={<Landing />} />
        <Route path="/tagTeamReport" element={<TagTeamReport />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
