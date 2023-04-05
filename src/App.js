import './App.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import Login from './Login/Login';

import Footer from './Components/Footer';
import Carousel from 'react-bootstrap/Carousel'
import AdminDashboard from './Components/Dashboard/Admin/AdminDashboard'
import PmDashboard from './Components/Dashboard/PM/PmDashboard';
import Read from './Components/Dashboard/Admin/Read/Read';
import AddProject from './Components/Forms/AddProject';
import Create from './Components/Dashboard/Admin/Create/Create';
import Update from './Components/Dashboard/Admin/Update/Update';
import Delete from './Components/Dashboard/Admin/Delete/Delete';
import {BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import Roles from './Components/Dashboard/Roles/Roles';
import AppRouter from './Components/AppRouter/AppRouter';



function App() {
  
  return (
    <Router>
    
    <div className="App">
    
    <div>
    <Routes>
    <Route exact path='/AdminDashboard' Component={AdminDashboard}/>
    </Routes>
    </div>
    
    <div>
    <Routes>
    <Route exact path='/' Component={LandingPage}/>
    </Routes>
    </div>



    <div>
    <Routes><Route exact path='/Create' Component={Create}/></Routes>
    </div>

    <div>
    <Routes><Route exact path='/Read' Component={Read}/></Routes>
    </div>

    
    <div>
    <Routes>
    <Route exact path='/Update' Component={Update}/></Routes>
    </div>
    </div>

    <div>
    <Routes>
    <Route exact path='/Roles' Component={Roles}/>
    </Routes>
    </div>

    <Routes>
      <Route exact path = '/Login' element={<Login/>}/>
    </Routes>
    {/* <AppRouter/> */}

    </Router>
        
    

  );
}

export default App;
