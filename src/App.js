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
import PmRead from './Components/Dashboard/PM/pmRead';
import PmUpdate from './Components/Dashboard/PM/pmUpdate';
import UserCreate from './Components/Dashboard/Users/userCreate';
import UserRead from './Components/Dashboard/Users/userRead';
import UserUpdate from './Components/Dashboard/Users/userUpdate';
import View from './Components/Dashboard/Admin/Read/View';
import CreateRepo from './Components/Dashboard/Admin/Create/CreateRepo';
import addCollab from './Components/Dashboard/Admin/addCollab/addCollab';
// import addPm from './Components/Dashboard/Admin/Create/addPm';
import parentForm from './Components/Dashboard/Admin/Create/parentForm';
import addPm from './Components/Dashboard/Admin/Create/addPm';
import addUser from './Components/Dashboard/Admin/Create/addUser.js';
import userDashboard from './Components/Dashboard/Users/userDashboard';






function App() {
  
  return (
    
    <div className="App">
      <Provider store = {store}>
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
          <Route exact path='/PmRead' Component={PmRead}/>
          <Route exact path='/PmUpdate/:id' Component={PmUpdate}/>
          <Route exact path='/UserCreate' Component={UserCreate}/>
          <Route exact path='/UserRead' Component={UserRead}/>
          <Route exact path='/UserUpdate/:id'Component={UserUpdate}/>
          <Route exact path='/View' Component={View}/>
          <Route exact path='/CreateRepo' Component={CreateRepo}/>
          <Route exact path='/addCollab' Component={addCollab}/>
          <Route exact path='/addPm' Component={addPm}/>
          <Route exact path='/parentForm' Component={parentForm}/>
          <Route exact path='/addUser' Component={addUser}/>
          <Route exact path='/pmDashboard' Component={PmDashboard}/>
          <Route exact path='/userDashboard'Component={userDashboard}/>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
