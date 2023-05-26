import React from 'react'
import { useState } from 'react';
import { button } from 'semantic-ui-react';

function Reports() {
    const [userProjectList, setUserProjectlist] = useState(false);
    const [showOtherTable, setShowOtherTable] = useState(false);
  
    const handleTableClick = () => {
      setUserProjectlist(true);
      setShowOtherTable(false);
    };
  
    const handleOtherTableClick = () => {
      setUserProjectlist(false);
      setShowOtherTable(true);
    };
  
    return (
      <div>
        <h1> Reports</h1>
        <br/>
        <br/>
        
        <button className='btn btn-danger mx-2' onClick={handleTableClick}>User Project List</button>
        <button  className='btn btn-danger mx-2' onClick={handleOtherTableClick}>Users With Multiple Project Access</button>
       <br/><br/>

        {userProjectList && (
            <div style={{marginLeft:'40px',marginRight:'40px'}}>
          <table  class="ui celled table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sahil</td>
                <td>Project A, Project B</td>
              </tr>
              <tr>
                <td>Hassain</td>
                <td>Project C</td>
              </tr>
            </tbody>
            
          </table >
          </div>
        )}
  
        {showOtherTable && (
            <div style={{marginLeft:'40px',marginRight:'40px'}}>
          
             <table  class="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>binduuuu</td>
                <td>bindu@gmail.com</td>
                <td>Project A</td>
              </tr>
              <tr>
                <td>swedaaa</td>
                <td>sweda@gmail.com</td>
                <td>Project B</td>
              </tr>
            </tbody>
          </table>
          </div>
            
          
        )}
      </div>
    );
  }

  export default Reports;