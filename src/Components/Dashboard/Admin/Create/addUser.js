import React, { useEffect, useState } from 'react';
import { Form} from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddPm from './addPm';
import NavBarA from '../NavbarA';
import { Button } from 'react-bootstrap';

const AddUser = () => {
  


  console.log("rendering.......")

  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  const { state } = useLocation();
  const { projectNameA, repo, projectDescription, userNameA } = state || {};
  console.log(userNameA)
  // console.log(repo)
  
  const[username,setusername]=useState('');
  // const { projectName, repo } = useLocation();
   useEffect(() => {
    fetch(`https://3a5e-106-51-70-135.ngrok-free.app/api/users/role/user`,{
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
  }

  if(projectNameA && options)
  {
    // dispatchPmGithub(createPmGithubName({projectName, repo, username}));
    const response= axios.post('https://3a5e-106-51-70-135.ngrok-free.app/api/collaborators/add',{owner, repo,username,accessToken
    })
    // navigate('/AdminDashboard')
    navigate('/finalForm', { state: { projectNameA, repo, projectDescription, userNameA, username } });
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
          <select onChange={(e) => setusername(e.target.value)}>
            {options.map((item, index) => (
              <option key={item.githubUsername} value={item.githubUsername}>
                {item.githubUsername}
              </option>
            ))}
          </select>
        </Form.Field>


        <Button type='submit' variant='primary' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
    </div>
  )
}



export default AddUser;