import React from "react";
import CommonProfile from "../projectManager/commonProfile";
import "./userDashboard.css";

const UserProfile = () => {
  let profileData = sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);

  return <CommonProfile profileData={pdata} />;
};

export default UserProfile;
