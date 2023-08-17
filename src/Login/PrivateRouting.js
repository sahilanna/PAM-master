import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router,  Route,Routes } from 'react-router-dom';

const LazyAdminDashboard = lazy(() =>  import("../Components/Dashboard/Admin/AdminDashboard"));
const LazyPmCreate = lazy(() => import("../Components/Dashboard/PM/pmCreate"));
const LazyCreate = lazy(()=> import("../Components/Dashboard/Admin/Create/Create"));
const LazyPmReadNew = lazy(() => import("../Components/Dashboard/PM/PmReadNew"));
const LazyUserCreate = lazy(() => import("../Components/Dashboard/Users/userCreate"));
const LazyUserAnalytics = lazy(() => import("../Components/Dashboard/UserDashboard/userAnalytics"));
const LazyCreateRepo = lazy(() => import("../Components/Dashboard/Admin/Create/CreateRepo"));
const LazyReports = lazy(() => import("../Components/Dashboard/Admin/Reports/Reports"));
const LazyPmRequestUser = lazy(() => import("../Components/Dashboard/Admin/PmRequests/PmRequestUser"));
const LazyPmRequestForm = lazy(() => import("../Components/Dashboard/ProjectManager/PmRequestForm"));
const LazyAddPm = lazy(() => import("../Components/Dashboard/Admin/Create/addPm"));
const LazyAddUser = lazy(() => import("../Components/Dashboard/Admin/Create/addUser"));
const LazyFigmaRead = lazy(() => import( "../Components/Dashboard/Admin/Figma/FigmaRead"));
const LazyFigmaCreate = lazy(() => import( "../Components/Dashboard/Admin/Figma/FigmaCreate"));
const LazyFigmaPmDashboard = lazy(() => import( "../Components/Dashboard/ProjectManager/figmaPmDashboard"));
const LazyRepoPmDashboard = lazy(() => import("../Components/Dashboard/ProjectManager/repoPmDashboard"));
const LazyCreateFigmaDetails = lazy(() => import( "../Components/Dashboard/Admin/Figma/createFigmaDetails"));
const LazyUserHistory = lazy(() => import( "../Components/Dashboard/Admin/userHistory/userHistory"));
const LazyUserProjects = lazy(() => import( "../Components/Dashboard/UserDashboard/userProjects"));
const LazyLogin = lazy(() => import( './Login'))
const LazyRepoRead = lazy(() => import( "../Components/Dashboard/Admin/Repository/repoRead"));
const LazyUserRead = lazy(() => import( "../Components/Dashboard/Users/userRead"));
const LazyPmDashboard = lazy(() => import( "../Components/Dashboard/ProjectManager/PmDashboard"));
const LazyUserRepoRead = lazy(() => import("../Components/Dashboard/UserDashboard/userRepoRead"));
const LazyUserFigmaRead = lazy(() => import( "../Components/Dashboard/UserDashboard/userFigmaRead"));
const LazyAnalytics = lazy(() => import( "../Components/Dashboard/Admin/Analytics/Analytics"));
const LazyProfile = lazy(() => import( "../Components/Dashboard/Admin/Profile"));
const LazyUserProfile = lazy(() => import( "../Components/Dashboard/UserDashboard/userProfile"));
const LazyPmProfile = lazy(() => import( "../Components/Dashboard/ProjectManager/pmprofile"));
const LazyAddUserName = lazy(() => import( "../Components/Dashboard/Users/AddUserName"));
const LazyCreateProject = lazy(() => import( "../Components/Dashboard/Admin/Create/CreateProject"));
const LazyAddPmUserName = lazy(() => import( "../Components/Dashboard/PM/addPmUsername"));
const LazyDeleteRepo = lazy(() => import( "../Components/Dashboard/Admin/Repository/deleteRepo"));
const LazyAddFile = lazy(() => import( "../Components/Dashboard/Admin/Create/addFile"));
const LazyProjectUsers = lazy(() => import( "../Components/Dashboard/Admin/Read/projectUsers"));
const LazyAddUserProject = lazy(() => import( "../Components/Dashboard/Admin/Create/addUserProject"));
const LazyProjectAnalytics = lazy(() => import( "../Components/Dashboard/Admin/Analytics/projectAnalytics"));
const LazyProjectPms = lazy(() => import("../Components/Dashboard/Admin/Read/projectPms"));
const LazyAddPmProject = lazy(() => import( "../Components/Dashboard/Admin/Create/addPmProject"));
const LazyUserActivity = lazy(() => import( "../Components/Dashboard/Users/userActivity")); 
const LazyPmNotification = lazy(() => import( "../Components/Dashboard/ProjectManager/pmNotification"));
const LazyViewUserVerification = lazy(() => import( "../Components/Dashboard/Admin/Figma/viewUserVerification"));
const LazyDriveDetails = lazy(() => import("../Components/Dashboard/Admin/Drive/driveDetails"));
const LazyCreateDriveDetails = lazy(() => import("../Components/Dashboard/Admin/Drive/createDriveDetails"));
const LazyShowAllNotification = lazy(() => import("../Components/Dashboard/ProjectManager/showAllNotification"));
const LazyDriveRead = lazy(() => import( "../Components/Dashboard/Admin/Drive/driveRead"));



const PrivateRoutes = () => {
    let data = sessionStorage.getItem("item");
    console.log(data.enumRole)
    console.log(data)
    let user = JSON.parse(data);
    console.log(user.role)
    const role=user.enumRole
   const id = user ? user.id : null;
    console.log(id)
   
    return (
        <>
          {role === "ADMIN" && (
            <Routes>

             
             <Route path="/AddPmUserName" element={<Suspense fallback={<div>Loading...</div>}><LazyAddPmUserName /></Suspense>} />
              <Route path="/AdminDashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyAdminDashboard/></Suspense>} />
              <Route path='/CreateProject' element={<Suspense fallback={<div>Loading...</div>}><LazyCreateProject/></Suspense>}/>
              <Route path="/AddUserName" element={<Suspense fallback={<div>Loading...</div>}><LazyAddUserName/></Suspense>} />
              <Route path="/Login" element={<Suspense fallback={<div>Loading...</div>}><LazyLogin /></Suspense>} />
              <Route path="/Create" element={<Suspense fallback={<div>Loading...</div>}><LazyCreate /></Suspense>} />
              <Route path="/RepoRead" element={<Suspense fallback={<div>Loading...</div>}><LazyRepoRead/></Suspense>} />
              <Route path="/UserRead" element={<Suspense fallback={<div>Loading...</div>}><LazyUserRead/></Suspense>} />
              <Route path="/PmCreate" element={<Suspense fallback={<div>Loading...</div>}><LazyPmCreate /></Suspense>} />
              <Route path="/PmReadNew" element={<Suspense fallback={<div>Loading...</div>}><LazyPmReadNew /></Suspense>} />
              <Route path="//PmUpdate/:id" element={<Suspense fallback={<div>Loading...</div>}><LazyPmReadNew /></Suspense>} />
              <Route path="/UserCreate" element={<Suspense fallback={<div>Loading...</div>}><LazyUserCreate /></Suspense>} />
              <Route path="/CreateRepo" element={<Suspense fallback={<div>Loading...</div>}><LazyCreateRepo /></Suspense>} />
              {/* <Route path="/addCollab" element={<LazyaddCollab />} /> */}
              <Route path="/AddPm" element={<Suspense fallback={<div>Loading...</div>}><LazyAddPm/></Suspense>} />
              <Route path="/addUser" element={<Suspense fallback={<div>Loading...</div>}><LazyAddUser /></Suspense>} />
              <Route path="/repoRead" element={<Suspense fallback={<div>Loading...</div>}><LazyRepoRead/></Suspense>} />
              <Route path="/FigmaRead" element={<Suspense fallback={<div>Loading...</div>}><LazyFigmaRead/></Suspense>} />
              <Route path="/FigmaCreate" element={<Suspense fallback={<div>Loading...</div>}><LazyFigmaCreate /></Suspense>} />
              <Route path="/UserHistory" element={<Suspense fallback={<div>Loading...</div>}><LazyUserHistory /></Suspense>} />
              <Route path="/Reports" element={<Suspense fallback={<div>Loading...</div>}><LazyReports /></Suspense>} />
              <Route path="/CreateFigmaDetails" element={<Suspense fallback={<div>Loading...</div>}><LazyCreateFigmaDetails/></Suspense>} />
              <Route path="/PmRequestUser" element={<Suspense fallback={<div>Loading...</div>}><LazyPmRequestUser/></Suspense>} />
              <Route path='/deleteRepo' element={<Suspense fallback={<div>Loading...</div>}><LazyDeleteRepo/></Suspense>}/>
              <Route path='/addFile' element={<Suspense fallback={<div>Loading...</div>}><LazyAddFile/></Suspense>}/>
              <Route path='/projectUsers' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectUsers/></Suspense>}/>
              <Route path='/addUserProject' element={<Suspense fallback={<div>Loading...</div>}><LazyAddUserProject/></Suspense>}/>
              <Route path='/projectPms' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectPms/></Suspense>}/>
              <Route path='/addPmProject' element={<Suspense fallback={<div>Loading...</div>}><LazyAddPmProject/></Suspense>}/>
              <Route path='/Profile' element={<Suspense fallback={<div>Loading...</div>}><LazyProfile/></Suspense>}/>
              <Route path='/ProjectAnalytics' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectAnalytics/></Suspense>}/>
              <Route path='/Analytics' element={<Suspense fallback={<div>Loading...</div>}><LazyAnalytics/></Suspense>}/>
              <Route path='/userActivity' element={<Suspense fallback={<div>Loading...</div>}><LazyUserActivity/></Suspense>}/>
              <Route path='/viewUserVerification' element={<Suspense fallback={<div>Loading...</div>}><LazyViewUserVerification/></Suspense>}/>
              <Route path='/createDriveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyCreateDriveDetails/></Suspense>}/>

              {/* <Route path='/gitCreate' element={<GitCreate/>}/> */}
             {/* <Route path='/projectAnalytics' element={<ProjectAnalytics/>}/> */}
             <Route path='/driveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyDriveDetails/></Suspense>}/>
             <Route path='/Create' element={<Suspense fallback={<div>Loading...</div>}><LazyCreate/></Suspense>}/>
             <Route path='/addPm' element={<Suspense fallback={<div>Loading...</div>}><LazyAddPm/></Suspense>}/>
             <Route path='/addUser' element={<Suspense fallback={<div>Loading...</div>}><LazyAddUser/></Suspense>}/>
             <Route path='/driveRead' element={<Suspense fallback={<div>Loading...</div>}><LazyDriveRead/></Suspense>}/>
             <Route path='/createdriveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyCreateDriveDetails/></Suspense>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
          {role === "PROJECT_MANAGER" && (
            <Routes>
              
              <Route path="/pmDashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyPmDashboard /></Suspense>} />
              <Route path="/figmaPmDashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyFigmaPmDashboard /></Suspense>} />
              <Route path="/PmRequestForm" element={<Suspense fallback={<div>Loading...</div>}><LazyPmRequestForm /></Suspense>} />
              <Route path="/repoPmDashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyRepoPmDashboard/></Suspense>} />
              <Route path='/pmProfile' element={<Suspense fallback={<div>Loading...</div>}><LazyPmProfile/></Suspense>}/>
              <Route path='/pmNotification' element={<Suspense fallback={<div>Loading...</div>}><LazyPmNotification/></Suspense>}/>
              <Route path='/showAllNotification' element={<Suspense fallback={<div>Loading...</div>}><LazyShowAllNotification/></Suspense>}/>
              
              <Route path="*" element={<h1>Page Not Found</h1>} />
             
            </Routes>
          )}
          {role === "USER" && (
            <Routes>
              
              <Route path="/userProjects" element={<Suspense fallback={<div>Loading...</div>}><LazyUserProjects/></Suspense>} />
              <Route path="/userAnalytics" element={<Suspense fallback={<div>Loading...</div>}><LazyUserAnalytics/></Suspense>} />
              <Route path="/userRepoRead" element={<Suspense fallback={<div>Loading...</div>}><LazyUserRepoRead /></Suspense>} />
              <Route path="/userFigmaRead" element={<Suspense fallback={<div>Loading...</div>}><LazyUserFigmaRead/></Suspense>} />
              <Route path='/userProfile' element={<Suspense fallback={<div>Loading...</div>}><LazyUserProfile/></Suspense>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
              
            </Routes>
          )}
        </>
      );
}
export default PrivateRoutes;