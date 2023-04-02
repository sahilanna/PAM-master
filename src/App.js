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




function App() {
  
  return (
    <Router>
    
    <div className="App">
      <Create/>
    
  {/* <Routes>
  <Route path='/Delete' Component={Delete}/>
      < Route path='/Update' Component={Update}/>
  </Routes> */}
     
     
      {/* <Routes>        
        <Route path='/Login' element={<Login/>} />
      </Routes>      
      <NavBar/>
      <LandingPage/>
      <Footer/>  */}
     
      {/* <AdminDashboard/>  */}
      {/* <PmDashboard/> */}
     {/* <AddProject/> */}

     {/* <Crud /> */}
     <div>
     <Routes><Route exact path='/Read' Component={Read}/></Routes>
     </div>
     <div>
     
     <Routes><Route exact path='/Create' Component={Create}/></Routes>
       
    </div>
    <div>
     <Routes><Route exact path='/Read' Component={Read}/></Routes>
     </div>
    <div>
<Routes>
    <Route path='/Update' Component={Update}/>
    <Route path='/Delete'Component={Delete}/>
    </Routes>
    </div>
    </div>
   
    </Router>
    
    

  );
}

export default App;
