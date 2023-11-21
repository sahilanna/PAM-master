import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRepoModal from "./createRepoModal";
import api from "../../../../../network/api";
import { NGROK_URL } from "../../../../../network/config";
import {
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
} from "../../../../../assets/constants/errorCode";

function CreateRepo() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      return;
    }
    setClicked(true);

    try {
      await api.post(`https://${NGROK_URL}/repositories/add`, {
        name,
        description,
      });
      navigate("/repoRead");
    } catch (error) {
      if (error.response && error.response.status === ERROR_CODE_BAD_REQUEST) {
        toast.error("Bad Request", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else if (error.response && error.response.status === ERROR_CODE_NOT_FOUND) {
        toast.error("404 NOT FOUND", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else if (error.response && error.response.status === ERROR_CODE_INTERNAL_SERVER_ERROR) {
        toast.error("Server Error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        toast.error("Error Occurred", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <CreateRepoModal
      name={name}
      description={description}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      clicked={clicked}
      onClose={onClose}
    />
  );
}

export default CreateRepo;
