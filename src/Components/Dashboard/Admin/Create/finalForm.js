import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavBarA from '../NavbarA';

const FinalForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { projectNameA, repo, projectDescription, userNameA, username } = state || {};
  const [formData, setFormData] = useState('');
  let [projectName, setProjectNameA] = useState('');
  let [repoName, setRepoName] = useState('');
  let [pmGithubUsername, setPmGithubUsername] = useState('');
  let [userGithubUsername, setUserGithubUsername] = useState('');

  console.log("hi");

  const handleSubmit = (e) => {
    e.preventDefault();
    projectName=projectNameA;
    repoName=repo;
    pmGithubUsername=userNameA;
    userGithubUsername=username;
    axios.post('https://f44c-106-51-70-135.ngrok-free.app/api/project-details/add', {projectName, repoName, projectDescription, pmGithubUsername, userGithubUsername}).then(() => {
      navigate('/adminDashboard');
    });
  };

  const handleBack = () => {
    navigate(-1);
  };


//   const handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

  return (
    <div>
      <NavBarA />
      <div>
    <div className='form-dis'>
      <Form className='form-style' onSubmit={handleSubmit}>
        <h1>Final Form</h1>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Project Name</label>
          <input name='projectName' value={projectNameA || ''} readOnly />
        </Form.Field>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Project Description</label>
          <input name='projectDescription' value={projectDescription || ''} readOnly />
        </Form.Field>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Repository Name</label>
          <input name='repoName' value={repo || ''} readOnly />
        </Form.Field>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>PM's Github Username</label>
          <input name='userNameA' value={userNameA || ''} readOnly  />
        </Form.Field>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>User's Github Username</label>
          <input name='username' value={username || ''} readOnly  />
        </Form.Field>


        <Button type='submit' variant='primary' onClick={handleSubmit}>Submit</Button>
      </Form>
      <Button className='back-button' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
    </div>
    </div>
    </div>
  );
};

export default FinalForm;
