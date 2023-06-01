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
import Pagination from './Components/Dashboard/Pagination/Pagination';
import Update from './Components/Dashboard/Admin/Update/Update';
import Delete from './Components/Dashboard/Admin/Delete/Delete';
import {BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Login/redux-store/store';
import Roles from './Components/Dashboard/Roles/Roles';
import Create from './Components/Dashboard/Admin/Create/Create';
import Read from './Components/Dashboard/Admin/Read/Read';
import PmCreate from './Components/Dashboard/PM/pmCreate';
import PmReadNew from './Components/Dashboard/PM/PmReadNew';
import PmUpdate from './Components/Dashboard/PM/pmUpdate';
import UserCreate from './Components/Dashboard/Users/userCreate';
import UserRead from './Components/Dashboard/Users/userRead';
import UserUpdate from './Components/Dashboard/Users/userUpdate';
import View from './Components/Dashboard/Admin/Read/View';
import CreateRepo from './Components/Dashboard/Admin/Create/CreateRepo';
import addCollab from './Components/Dashboard/Admin/addCollab/addCollab';
import addPm from './Components/Dashboard/Admin/Create/addPm';
import addUser from './Components/Dashboard/Admin/Create/addUser.js';
import userDashboard from './Components/Dashboard/Users/userDashboard';
import FinalForm from './Components/Dashboard/Admin/Create/finalForm';
import NavBarA from './Components/Dashboard/Admin/NavbarA';
import projectDetailsNew from './Components/Dashboard/Admin/Read/projectDetailsNew';
import SideBar from './Components/Dashboard/SideBar/SideBar';
import repoRead from './Components/Dashboard/Admin/Repository/repoRead';
import FigmaRead from './Components/Dashboard/Admin/Figma/FigmaRead';
import FigmaCreate from './Components/Dashboard/Admin/Figma/FigmaCreate';
import userHistory from './Components/Dashboard/Admin/userHistory/userHistory';
import Reports from './Components/Dashboard/Admin/Reports/Reports';
import Sidebar from './Components/Dashboard/SideBar/SideBar';
import Signup from './Login/signUp';
import createFigmaDetails from './Components/Dashboard/Admin/Figma/createFigmaDetails';







function App() {
  
  return (
    
    <div className="App">
      <Provider store = {store}>
      {/* <div style={{display:'flex', flexDirection:'row'}}>
              <Sidebar/> */}
              
        <Router>
          <Routes>
           
          <Route exact path='/AdminDashboard' Component={AdminDashboard}/>
          <Route exact path='/' Component={LandingPage}/>
          <Route exact path='/Create' Component={Create}/>
          <Route exact path='/Read' Component={Read}/>
          <Route exact path='/Update/:projectId' Component={Update}/>
          <Route exact path='/Roles' Component={Roles}/>
          <Route exact path='/Login' Component={Login}/>
          <Route exact path='/PmCreate' Component={PmCreate}/>
          <Route exact path='/PmReadNew' Component={PmReadNew}/>
          <Route exact path='/PmUpdate/:id' Component={PmUpdate}/>
          <Route exact path='/UserCreate' Component={UserCreate}/>
          <Route exact path='/UserRead' Component={UserRead}/>
          <Route exact path='/UserUpdate/:id'Component={UserUpdate}/>
          <Route exact path='/View' Component={View}/>
          <Route exact path='/CreateRepo' Component={CreateRepo}/>
          <Route exact path='/addCollab' Component={addCollab}/>
          <Route exact path='/addPm' Component={addPm}/>
          <Route exact path='/addUser' Component={addUser}/>
          <Route exact path='/pmDashboard' Component={PmDashboard}/>
          <Route exact path='/userDashboard'Component={userDashboard}/>
          <Route exact path='/finalForm' Component={FinalForm}/>
          <Route exact path='/NavbarA' Component={NavBarA}/>
          <Route exact path='/ProjectDetailsNew' Component={projectDetailsNew}/>
          <Route exact path='/SideBar' Component={SideBar}/>
          <Route exact path='/repoRead' Component={repoRead}/>
          <Route exact path='/FigmaRead' Component={FigmaRead}/>
          <Route exact path='/FigmaCreate' Component={FigmaCreate}/>
          <Route exact path='/userHistory' Component={userHistory}/>
          <Route exact path='/Reports' Component={Reports}/>
          <Route exact path='/SignUp' Component={Signup}/>
          <Route exact path='/createFigmaDetails' Component={createFigmaDetails}/>
          
          
          </Routes>
        </Router>
        {/* </div> */}
      </Provider>
    </div>
  );
}

export default App;
