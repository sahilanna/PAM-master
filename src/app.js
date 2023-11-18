import React, { Suspense } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/reduxStore/store";
import PrivateRoutes from "./privateRouting";
import LandingPage from "./screens/landingPage/landingPage";
import Login from "./screens/login/login";
import LoadingPage from "./atoms/loadingPage/loadingPage";
import Faq from "./screens/faq/faq";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from "./screens/logout/logout";
import "./app.css";
import "././screens/dashboard/admin/create/commonModal.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/LoadingPage"
              element={<LoadingPage />}
            />
            <Route
              path="/Login"
              element={<Login />}
            />
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/Logout"
              element={<Logout />}
            />
            <Route
              path="/faq"
              element={<Faq />}
            />
            <Route
              element={
                <Suspense
                  fallback={<div>Loading...</div>}
                >
                  <PrivateRoutes />
                </Suspense>
              }
            >
              <Route
                path="*"
                element={<h1>Page Not Found</h1>}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
