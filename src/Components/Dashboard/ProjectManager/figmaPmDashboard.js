import React from 'react'
import PmSidebar from './pmSidebar';

function FigmaPmDashboard() {
  
    return (
        <div className='parent-admin'>
        <div style={{ height: '100vh', overflow: 'scroll initial' }}>
            <PmSidebar/>
            </div>
           <div className='admin-child'>
              <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop:'20px',marginBottom:'30px',marginLeft:'40px',marginRight:'30px'}}>
            <div class="ui left icon input">
      <input type="text" placeholder="Search Projects..."  ></input>
      <i class="users icon"></i>
    </div>
    
    
      
        
        </div>
        
        <div style={{marginLeft:'20px',marginRight:'30px'}}>
        <table class="ui celled table">
           
            <thead>
                <th>Project Name</th>
                <th>Figma URL</th>
                
                
                {/* <th>Repository Name</th> */}
                {/* <th>PM Github</th>
                <th>User Github</th>  */}
                
                {/* <th>Edit</th> */}
                
            </thead>
            
            <tbody>
            
                <tr>
                  <td></td>
                  <td></td>
                  {/* <td></td> */}
                  
             
                  
            </tr> 
            </tbody>
          </table>
          </div>
          </div>
    
        </div>
      )
    }
  


export default FigmaPmDashboard;