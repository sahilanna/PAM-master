import React from "react";
import UserSidebar from "../sidebar/userSidebar";
import PmSidebar from "../sidebar/pmSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ProfilePU({ profileData }) {
  const id = profileData.id;
  const pname = profileData.name;
  const pemail = profileData.email;
  const prole = profileData.enumRole;

  return (
    <div className="user-read-screen">
      <div>{prole === "PM" ? <PmSidebar /> : <UserSidebar />}</div>
      <div className="admin-chil">
        <div className="profile-paren">
          <div className="profile-details">
            <div className="profile-imag">
              <h1>PROFILE</h1>
              <FontAwesomeIcon icon={faUser} size="7x" />
              <div className="profile-chil">
                <b>Name</b>
                <p>{pname}</p>
                <b>Email</b>
                <p>{pemail}</p>
                <b>Role</b>
                <p>{prole}</p>
                <b>ID</b>
                <p>{id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePU;
