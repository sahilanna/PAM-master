

// function MyForm() {
//   const [name, setName] = useState('');
//   const [repo, setRepo] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = {
//      name:  name,
//      name: repo
//     };


//     const token = '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'
//     const handleSubmit = async (formData) => {
//       const headers = {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer' + token,
//         'Content-Length': 0,
//         'X-Github-Api-Version': '2022-11-28',
//         'Accept': 'application/vnd.github+json',
//         'Connection': 'keep-alive', 
//         'Accept-Encoding': 'gzip, deflate,br',
//         'User-Agent':'PostmanRuntime/7.32.2',
//       };
    
//       try {
//         const response = await axios.post('https://api.github.com/repos/swe1304/repo/collaborators/name', formData, { headers });
    
//         // Handle the response from the backend
//         console.log("Hi");
//         console.log(response.data);
//       } catch (error) {
//         // Handle errors
//         console.log("Im not Sorry");
//         console.error(error);
//       }
//     };
    

//     // Call the API function here and pass the formData object as an argument
//     // Example: await handleSubmit(formData);

//     // Clear the form after submission
    
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="repo">repo:</label>
//         <input
//           type="repo"
//           id="repo"
//           value={repo}
//           onChange={(event) => setRepo(event.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default MyForm;




























import React, { useState } from 'react'
import { Form, Button} from 'semantic-ui-react'
import axios from 'axios';

function CreateRepo() {

    let[repo,setRepo]=useState('');
    let[userName,setUserName]=useState('');

    const token = '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'

  
   

   let handleSubmit=(e)=>{
    const form={repo,userName}
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' +' '+ token,
    'Content-Length': 0,
    'X-Github-Api-Version': '2022-11-28',
    'Accept': 'application/vnd.github+json',
    'Connection': 'keep-alive', 
    'Accept-Encoding': 'gzip, deflate,br',
    'User-Agent':'PostmanRuntime/7.32.2',
  };
        e.preventDefault();
        const response= axios.post('https://api.github.com/repos/swe1304/repo/collaborators/userName',{form,  headers} )
        console.log(repo);
        console.log(userName);

    }


  return (
    <div>
        <Form.Field>
        <label>Repo Name</label>
        <input name='repo' onChange={(e)=>setRepo(e.target.value)} placeholder='REpo' />
        
             
      </Form.Field>
      <Form.Field>
        <label>User Name</label>
        <input name='userName' onChange={(e)=>setUserName(e.target.value)} placeholder='username' />
        
             
      </Form.Field>
      <button onClick={handleSubmit}>Submit</button>

    </div>
  )
}


export default CreateRepo
