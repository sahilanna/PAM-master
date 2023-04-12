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
//import Read from './Components/Dashboard/Admin/Read/Read';
import AddProject from './Components/Forms/AddProject';
// import Create from './Components/Dashboard/Roles/Create/Create';
import Update from './Components/Dashboard/Admin/Update/Update';
import Delete from './Components/Dashboard/Admin/Delete/Delete';
import {BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux-store/store';
import Roles from './Components/Dashboard/Roles/Roles';
import Create from './Components/Dashboard/Admin/Create/Create';
import Read from './Components/Dashboard/Admin/Read/Read';
import PmCreate from './Components/Dashboard/PM/pmCreate';
import PmRead from './Components/Dashboard/PM/pmRead';




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
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
