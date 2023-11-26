import React from "react";
import ProfilePU from "../projectManager/profilePU";
import "./userDashboard.css";

const UserProfile = () => {
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);

  return <ProfilePU profileData={pdata} />;
};

export default UserProfile;
