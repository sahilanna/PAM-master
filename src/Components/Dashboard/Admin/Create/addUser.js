import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import AddPm from './addPm';


const AddUser = () => {
  


  console.log("rendering.......")

  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error,setError]=useState('false');
  const { state } = useLocation();
  const { projectNameA, repo } = state || {};
  console.log(projectNameA)
  console.log(repo)
  
  const[username,setusername]=useState('');
  // const { projectName, repo } = useLocation();
   useEffect(() => {
    fetch(`https://b1de-106-51-70-135.ngrok-free.app/api/users/role/user`,{
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
    const response= axios.post('https://b1de-106-51-70-135.ngrok-free.app/api/collaborators/add',{owner, repo,username,accessToken
    })
    navigate('/AdminDashboard')
  }
}
 
  return (
    
    <div className="form-display">
      {console.log("rendering again...........")}
      <Form className="form-style">
        <h1> Add User to Repo</h1>

        <Form.Field>
          <label>Project Name</label>
          <input name="projectNameA" value={projectNameA ||''} readOnly/>
        </Form.Field>

        <Form.Field>
          <label>Repository Name</label>
          <input name="repoName" value={repo || ''} readOnly  />
        </Form.Field>
        <Form.Field>
          <label>User Username</label>
          <select onChange={(e) => setusername(e.target.value)}>
            {options.map((item, index) => (
              <option key={item.githubUsername} value={item.githubUsername}>
                {item.githubUsername}
              </option>
            ))}
          </select>
        </Form.Field>


        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};



export default AddUser;