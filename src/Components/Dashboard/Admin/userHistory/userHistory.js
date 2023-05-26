import React from 'react'
import { table } from 'semantic-ui-react'

function userHistory() {
  return (
    <div>
        <div>
            <h1>User History</h1>
        </div>
        <br/>
        <br/>
        <div style={{marginLeft:'20px',marginRight:'30px'}}>
        <table class="ui celled table">
  <thead>
    <tr>
      <th>Projects</th>
      <th>Status</th>
      <th>Last Updated</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>project 1</td>
      <td><i class="icon checkmark">Completed</i></td>
      <td class="negative">None</td>
    </tr>
    <tr class="positive">
      <td>project 3</td>
      <td><i class="icon checkmark"></i> Approved</td>
      <td>3/1/22</td>
    </tr>
    <tr>
      <td>project 2</td>
      <td>Unknown</td>
      <td class="positive"><i class="icon close"></i> Requires call</td>
    </tr>


    
    
  </tbody>
</table>
</div>
    </div>
  )
}

export default userHistory