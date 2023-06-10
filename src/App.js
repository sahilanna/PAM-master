import './App.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import Login from './Login/Login';
import Footer from './Components/Footer';
import Carousel from 'react-bootstrap/Carousel'
import AdminDashboard from './Components/Dashboard/Admin/AdminDashboard'
import Pagination from './Components/Dashboard/Pagination/Pagination';
import Update from './Components/Dashboard/Admin/Update/Update';
import Delete from './Components/Dashboard/Admin/Delete/Delete';
import {BrowserRouter as Router , Route,Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Login/redux-store/store';
import PrivateRoutes from './Login/PrivateRouting';
import PmDashboard from './Components/Dashboard/ProjectManager/PmDashboard';
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
//import userDashboard from './Components/Dashboard/Users/userDashboard';
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
import repoPmDashboard from './Components/Dashboard/ProjectManager/repoPmDashboard';
import pmSidebar from './Components/Dashboard/ProjectManager/pmSidebar';
import FigmaPmDashboard from './Components/Dashboard/ProjectManager/figmaPmDashboard';
import userProjects from './Components/Dashboard/UserDashboard/userProjects';
import UserSidebar from './Components/Dashboard/UserDashboard/userSidebar';
import userRepoRead from './Components/Dashboard/UserDashboard/userRepoRead';
import userFigmaRead from './Components/Dashboard/UserDashboard/userFigmaRead';
import PmRequestForm from './Components/Dashboard/ProjectManager/PmRequestForm';
import PmRequestUser from './Components/Dashboard/Admin/PmRequests/PmRequestUser';
import Logout from './Login/Logout';







function App() {
  
  return (
    
    <div className="App">
      <Provider store = {store}>
      {/* <div style={{display:'flex', flexDirection:'row'}}>
              <Sidebar/> */}
              
        <BrowserRouter>
          <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path="/UserCreate" element={<UserCreate />} />
          <Route path="/PmCreate" element={<PmCreate />} />
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
        </BrowserRouter>
        {/* </div> */}
      </Provider>
    </div>
  );
}

export default App;
