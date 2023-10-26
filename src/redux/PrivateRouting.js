import React, {lazy, Suspense} from "react";
import {  Route,Routes } from 'react-router-dom';
import ProjectDetails from "../screens/Dashboard/Admin/Read/ProjectDetails";


const LazyAdminDashboard = lazy(() =>  import("../screens/Dashboard/Admin/AdminDashboard"));
const LazyPmCreate = lazy(() => import("../screens/Dashboard/PM/pmCreate"));
const LazyCreate = lazy(()=> import("../screens/Dashboard/Admin/Create/addProjectRepo/Create"));
const LazyPmReadNew = lazy(() => import("../screens/Dashboard/PM/PmReadNew"));
const LazyUserCreate = lazy(() => import("../screens/Dashboard/Users/userCreate"));
const LazyCreateRepo = lazy(() => import("../screens/Dashboard/Admin/Create/createRepo/CreateRepo"));
const LazyReports = lazy(() => import("../screens/Dashboard/Admin/Reports/Reports"));
const LazyPmRequestUser = lazy(() => import("../screens/Dashboard/Admin/PmRequests/PmRequestUser"));
const LazyPmRequestForm = lazy(() => import("../screens/Dashboard/ProjectManager/PmRequestForm"));
const LazyAddPm = lazy(() => import("../screens/Dashboard/Admin/Create/addPmGit/addPm"));
const LazyAddUser = lazy(() => import("../screens/Dashboard/Admin/Create/addUserGit/addUser"));
const LazyFigmaRead = lazy(() => import( "../screens/Dashboard/Admin/Figma/FigmaRead"));
const LazyFigmaCreate = lazy(() => import( "../screens/Dashboard/Admin/Figma/FigmaCreate"));
const LazyRepoPmDashboard = lazy(() => import("../screens/Dashboard/ProjectManager/repoPmDashboard"));
const LazyCreateFigmaDetails = lazy(() => import( "../screens/Dashboard/Admin/Figma/createFigma/createFigmaDetails"));
const LazyUserHistory = lazy(() => import( "../screens/Dashboard/Admin/userHistory/userHistory"));
const LazyUserProjects = lazy(() => import( "../screens/Dashboard/UserDashboard/userProjects"));
const LazyLogin = lazy(() => import( './Login'))
const LazyRepoRead = lazy(() => import( "../screens/Dashboard/Admin/Repository/repoRead"));
const LazyUserRead = lazy(() => import( "../screens/Dashboard/Users/userRead"));
const LazyPmDashboard = lazy(() => import( "../screens/Dashboard/ProjectManager/PmDashboard"));
const LazyUserRepoRead = lazy(() => import("../screens/Dashboard/UserDashboard/userRepoRead"));
const LazyAnalytics = lazy(() => import( "../screens/Dashboard/Admin/Analytics/Analytics"));
const LazyProfile = lazy(() => import( "../screens/Dashboard/Admin/Profile"));
const LazyUserProfile = lazy(() => import( "../screens/Dashboard/UserDashboard/userProfile"));
const LazyPmProfile = lazy(() => import( "../screens/Dashboard/ProjectManager/pmprofile"));
const LazyAddUserName = lazy(() => import( "../screens/Dashboard/Users/AddUserName"));
const LazyCreateProject = lazy(() => import( "../screens/Dashboard/Admin/Create/createProject/CreateProject"));
const LazyAddPmUserName = lazy(() => import( "../screens/Dashboard/PM/addPmUsername"));
const LazyAddFile = lazy(() => import( "../screens/Dashboard/Admin/Create/addFile/addFile"));
const LazyProjectUsers = lazy(() => import( "../screens/Dashboard/Admin/Read/projectUsers"));
const LazyAddUserProject = lazy(() => import( "../screens/Dashboard/Admin/Create/addUserProject/addUserProject"));
const LazyProjectAnalytics = lazy(() => import( "../screens/Dashboard/Admin/Analytics/projectAnalytics"));
const LazyProjectPms = lazy(() => import("../screens/Dashboard/Admin/Read/projectPms"));
const LazyAddPmProject = lazy(() => import( "../screens/Dashboard/Admin/Create/addPmProject/addPmProject"));
const LazyUserActivity = lazy(() => import( "../screens/Dashboard/Users/userActivity"));
const LazyPmNotification = lazy(() => import( "../screens/Dashboard/ProjectManager/pmNotification"));
const LazyDriveDetails = lazy(() => import("../screens/Dashboard/Admin/Drive/driveScreen/driveDetails"));
const LazyCreateDriveDetails = lazy(() => import("../screens/Dashboard/Admin/Drive/createDrive/createDriveDetails"));
const LazyShowAllNotification = lazy(() => import("../screens/Dashboard/ProjectManager/showAllNotification"));

const PrivateRoutes = () => {
    let data = sessionStorage.getItem("item");
    let user = JSON.parse(data);

    
    let role=null;
    if(user !== null)
      role=user.enumRole
    
    
      
   const id = user.id ;
    console.log(id)
    return (
        <>
          {role === "ADMIN" && (
            <Routes><Route path="/AddPmUserName" element={<Suspense fallback={<div>Loading...</div>}><LazyAddPmUserName /></Suspense>} />
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
            <Route path="/AddPm" element={<Suspense fallback={<div>Loading...</div>}><LazyAddPm/></Suspense>} />
            <Route path="/addUser" element={<Suspense fallback={<div>Loading...</div>}><LazyAddUser /></Suspense>} />
            <Route path="/repoRead" element={<Suspense fallback={<div>Loading...</div>}><LazyRepoRead/></Suspense>} />
            <Route path="/FigmaRead" element={<Suspense fallback={<div>Loading...</div>}><LazyFigmaRead/></Suspense>} />
            <Route path="/FigmaCreate" element={<Suspense fallback={<div>Loading...</div>}><LazyFigmaCreate /></Suspense>} />
            <Route path="/UserHistory" element={<Suspense fallback={<div>Loading...</div>}><LazyUserHistory /></Suspense>} />
            <Route path="/Reports" element={<Suspense fallback={<div>Loading...</div>}><LazyReports /></Suspense>} />
            <Route path="/CreateFigmaDetails" element={<Suspense fallback={<div>Loading...</div>}><LazyCreateFigmaDetails/></Suspense>} />
            <Route path="/PmRequestUser" element={<Suspense fallback={<div>Loading...</div>}><LazyPmRequestUser/></Suspense>} />
           
            <Route path='/addFile' element={<Suspense fallback={<div>Loading...</div>}><LazyAddFile/></Suspense>}/>
            <Route path='/projectUsers' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectUsers/></Suspense>}/>
            <Route path='/addUserProject' element={<Suspense fallback={<div>Loading...</div>}><LazyAddUserProject/></Suspense>}/>
            <Route path='/projectPms' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectPms/></Suspense>}/>
            <Route path='/addPmProject' element={<Suspense fallback={<div>Loading...</div>}><LazyAddPmProject/></Suspense>}/>
            <Route path='/Profile' element={<Suspense fallback={<div>Loading...</div>}><LazyProfile/></Suspense>}/>
            <Route path='/ProjectAnalytics' element={<Suspense fallback={<div>Loading...</div>}><LazyProjectAnalytics/></Suspense>}/>
            <Route path='/Analytics' element={<Suspense fallback={<div>Loading...</div>}><LazyAnalytics/></Suspense>}/>
            <Route path='/userActivity' element={<Suspense fallback={<div>Loading...</div>}><LazyUserActivity/></Suspense>}/>
            <Route path='/createDriveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyCreateDriveDetails/></Suspense>}/>
            <Route path='/ProjectDetails/:projectId/:projectName' element={<Suspense fallback={<div>Loading...</div>}><ProjectDetails/></Suspense>}/>
           <Route path='/driveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyDriveDetails/></Suspense>}/>
           <Route path='/Create' element={<Suspense fallback={<div>Loading...</div>}><LazyCreate/></Suspense>}/>
           <Route path='/addPm' element={<Suspense fallback={<div>Loading...</div>}><LazyAddPm/></Suspense>}/>
           <Route path='/addUser' element={<Suspense fallback={<div>Loading...</div>}><LazyAddUser/></Suspense>}/>
           <Route path='/createdriveDetails' element={<Suspense fallback={<div>Loading...</div>}><LazyCreateDriveDetails/></Suspense>}/>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        )}
        {role === "PROJECT_MANAGER" && (
          <Routes>
            <Route path="/pmDashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyPmDashboard /></Suspense>} />
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
            <Route path="/userRepoRead" element={<Suspense fallback={<div>Loading...</div>}><LazyUserRepoRead /></Suspense>} />
            <Route path='/userProfile' element={<Suspense fallback={<div>Loading...</div>}><LazyUserProfile/></Suspense>}/>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        )}
      </>
    );
}
export default PrivateRoutes;






































