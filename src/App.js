import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import LandingPage from './Components/LandingPage';
import Login from './Login/Login';
import { Route,Routes, BrowserRouter } from 'react-router-dom';
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
     
              
        <BrowserRouter>
          <Routes>

          <Route path='/ipAddress' element={<IpAddress/>}/>

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
       
      </Provider>
    </div>
  );
}

export default App;
