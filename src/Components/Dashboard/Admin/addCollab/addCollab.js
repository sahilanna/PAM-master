import React from 'react'

import api from '../../api'

function addCollab() {

    let handleSubmit=(e)=>{
        const owner='swe1304'
        const repo='BEWorking'
        const username='dhassain'
        const accessToken='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'
    

            api.post('https://09d0-106-51-70-135.ngrok-free.app/api/collaborators/add',{owner, repo,username,accessToken
            
             
            })

            
        }
    
  return (

    
    <div>
        <button onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}

export default addCollab
