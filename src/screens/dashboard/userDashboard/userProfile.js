import React from "react";
import "./profile.css";
import ProfilePU from "../projectManager/profilePU";

const UserProfile = () => {
  let profileData =
    sessionStorage.getItem("item");
  let pdata = JSON.parse(profileData);

  return <ProfilePU profileData={pdata} />;
};

export default UserProfile;
