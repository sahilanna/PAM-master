import React, { useEffect, useState } from 'react';
import { Form} from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddPm from './addPm';
import NavBarA from '../NavbarA';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ngrokUrl } from '../../../../Assets/config';

const AddUser = () => {
  


  // console.log("rendering.......")

  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  const { state } = useLocation();
  const { projectNameA, repo, projectDescription, userNameA } = state || {};
  // console.log(userNameA)
  // console.log(repo)
  
  const[username,setUsername]=useState([]);
  const handleBack = () => {
    navigate(-1); // Go back one page in history
  };

  // const { projectName, repo } = useLocation();
   useEffect(() => {
    fetch(`https://${ngrokUrl}/api/users/role/user`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }}).then((response)=>response.json())
    .then((data)=>setOptions(data))
  
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const owner='swe1304';
    const accessToken='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';
    if(!projectNameA||!options||projectNameA.length===0 ||  options.length === 0){
      setError(true)
      console.log('lll')
      //hi
  }

  if(projectNameA && options)
  {
    // dispatchPmGithub(createPmGithubName({projectName, repo, username}));
    const promises = username.map((user) => axios.post(`https://${ngrokUrl}/api/collaborators/add`,{owner, repo,username:user,accessToken
    }));
    Promise.all(promises).then(() => {
      navigate('/finalForm', { state: { projectNameA, repo, projectDescription, userNameA, username } });
    })
    
  }
}
 
  return (
    <div> 
      <NavBarA/> 
    <div >
    {/* <div className="form-display"> */}
      {/* {console.log("rendering again...........")} */}
      <Form className="form-style">
        <h1> Add User to Repo</h1>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Project Name</label>
          <input name="projectNameA" value={projectNameA ||''} readOnly/>
        </Form.Field>

        <Form.Field>
          <label style={{ textAlign: 'left' }}>Repository Name</label>
          <input name="repoName" value={repo || ''} readOnly  />
        </Form.Field>
       
        <Form.Field>
  <label style={{ textAlign: 'left' }}>User Username</label>
  {/* <Form.Select
    options={options.map((item, index) => ({
      key: item.githubUsername,
      value: item.githubUsername,
      text: item.githubUsername
    }))}
    onChange={(e, { value }) => setUsername(value)}
    placeholder="Select User Username"
    search
    selection
    dropdownDirection="down"
  /> */
  <Form.Select
  options={options.map((item, index) => ({
    key: item.githubUsername,
    value: item.githubUsername,
    text: item.githubUsername
  }))}
  onChange={(e, { value }) => setUsername(value)}
  placeholder="Select User Username"
  search
  selection
  dropdownDirection="down"
  multiple // Allow multiple selections
/>

  }
</Form.Field>



        <Button type='submit' variant='primary' onClick={handleSubmit}>Submit</Button>
      </Form>
      <Button className="back-button" onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} /> </Button>
    </div>
    </div>
  )
}



export default AddUser;