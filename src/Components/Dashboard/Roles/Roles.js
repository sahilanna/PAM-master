import React from "react";
import {Link} from 'react-router-dom'
//import './Roles.css'
//import pmRead from "../Admin/PMs/pmRead";
//import NavBar from './Components/NavBar';
export default function () {
  return (
    <div>
      <body >
    <h1 style={{color: "black"}}>Roles</h1>
<div>
    <Link to='/pmRead'>
    <button type="button"  class="btn btn-primary btn-lg">Project Manager</button>
    </Link>
     <br/>
    <br/>
    <Link to='/userRead'>
    <button type="button" class="btn btn-primary btn-lg">User</button>
    </Link>
    </div>
    </body>
    </div>
  )
}