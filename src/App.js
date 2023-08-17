import './App.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import Login from './Login/Login';
import {BrowserRouter as Router , Route,Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Login/redux-store/store';
import PrivateRoutes from './Login/PrivateRouting';
import Logout from './Login/Logout';
import LoadingPage from './Assets/Loader/LoadingPage';
import Faq from "./Components/faq";
import IpAddress from './Assets/ipAddress';








function App() {
  
  return (
    
    <div className="App">
      <Provider store = {store}>
      {/* <div style={{display:'flex', flexDirection:'row'}}>
              <Sidebar/> */}
              
        <BrowserRouter>
          <Routes>
{/*             
          <Route path="/FigmaCreate" element={<FigmaCreate />} />
          <Route path="/CreateFigmaDetails" element={<CreateFigmaDetails/>} />
          <Route path="/FigmaRead" element={<FigmaRead/>} />
          <Route path='/CreateProject' element={<CreateProject/>}/>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/RepoRead" element={<RepoRead/>} />
          <Route path="/PmCreate" element={<PmCreate />} />
              <Route path="/PmReadNew" element={<PmReadNew />} />
              <Route path="//PmUpdate/:id" element={<PmReadNew />} />
              <Route path="/UserCreate" element={<UserCreate />} />
          <Route path='/CreateProject' element={<CreateProject/>}/>
              <Route path="/AddUserName" element={<AddUserName/>} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Create" element={<Create />} /> */}
                 <Route path='/ipAddress' element={<IpAddress/>}/>
                {/* <Route path='/CreateProject' element={<CreateProject/>}/> */}
          <Route path='/LoadingPage' element={<LoadingPage/>}/>
          <Route path="/Login" element={<Login/>} />
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path='/faq' element={<Faq/>}/>
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
