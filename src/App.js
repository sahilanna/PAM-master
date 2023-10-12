import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './screens/LandingPage';
import Login from './redux/Login';
import {Route,Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store/store';
import PrivateRoutes from './redux/PrivateRouting';
import Logout from './redux/Logout';
import LoadingPage from './atoms/loadingPage';
import Faq from "./screens/faq";





function App() {
  
  return (
    
    <div className="App">
      <Provider store = {store}>
     
              
        <BrowserRouter>
          <Routes>

          
          <Route path='/LoadingPage' element={<LoadingPage/>}/>
        
          <Route path="/Login" element={<Login/>} />
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path='/faq' element={<Faq/>}/>
        <Route element={ <Suspense fallback={<div>Loading...</div>}><PrivateRoutes /></Suspense>}>
          
          <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
        </BrowserRouter>
       
      </Provider>
    </div>
  );
}

export default App;
