// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Form, Button, Dropdown } from 'semantic-ui-react';
// import { ngrokUrlSwe } from '../../../../Assets/config';

// function DeleteRepository() {
//     const[selectedRepo, setSelectedRepo]=useState('')
//     const[repo, setRepo]=useEffect([])

//     useEffect(()=>{
//         deleteItem()

//     },[])
   
//     const deleteItem = async () => {
//         try {
//           const response = await axios.get(`https://${ngrokUrlSwe}/api/repositories/get`, {
//             headers: {
//               'ngrok-skip-browser-warning': 'true'
//             }
//           });
//          console.log(response.data)
//          const repoNames = response.data.map(repo => repo.name);
//          setRepo(repoNames);
      
//         } catch (error) {
//           console.log('Error fetching Users:', error);
//         }

       

//     //     const handleRepoChange = (e, { value }) => {
//     //         setSelectedRepo(value);
//     //       };
//     }

//   return (
//     <div>
       
//         {/* <Form.Field>
//             <label>User</label>
//             <Dropdown
//               placeholder="Select User"
//               fluid
//               selection
//               onChange={handleRepoChange}
//               options={repo.map((name, index) => ({
//                 key: index,
//                 text: name,
//                 value: name
//               }))}
//               value={selectedRepo}
             
              
//             />
//           </Form.Field>
//           </Form> */}
//           <Button type="submit">Submit</Button>

//     </div>
//   )
// }

// export default DeleteRepository