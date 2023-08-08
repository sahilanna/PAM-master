import React, { useEffect } from 'react'
import axios from 'axios';
import {  Button } from 'semantic-ui-react';


function DeleteRepository() {
    
    const[repo, setRepo]=useEffect([])
    console.log(repo);

    let dataa = sessionStorage.getItem("item");
    let user = JSON.parse(dataa);
    const accessToken=user.token
    console.log(user)
      console.log(user.token)

    useEffect(()=>{
        deleteItem()

    },[])
   
    const deleteItem = async () => {
        try {
          const response = await axios.get(`https://${ngrokUrl}/api/repositories/get`, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
              AccessToken:accessToken
            }
          });
         console.log(response.data)
         const repoNames = response.data.map(repo => repo.name);
         setRepo(repoNames);
      
        } catch (error) {
          console.log('Error fetching Users:', error);
        }

    }

  return (
    <div>
          <Button type="submit">Submit</Button>

    </div>
  )
}

export default DeleteRepository