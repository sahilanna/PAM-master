import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProjectDetails from "./screens/dashboard/admin/read/projectDetails";
import logger from "./utils/logger.js";
import LoadingPage from "./atoms/loadingPage/loadingPage";
import { ADMIN, PROJECT_MANAGER, USER } from "./assets/constants/projectRoles";
const LazyAdminDashboard = lazy(
  () => import("./screens/dashboard/admin/adminDashboard/adminDashboard")
);
const LazyPmCreate = lazy(() => import("./screens/dashboard/pm/pmCreate"));
const LazyCreate = lazy(
  () => import("./screens/dashboard/admin/create/addProjectRepo/addProjectRepo")
);
const LazyPmReadNew = lazy(() => import("./screens/dashboard/pm/pmReadNew"));
const LazyUserCreate = lazy(() => import("./screens/dashboard/users/userCreateModal"));
const LazyCreateRepo = lazy(() => import("./screens/dashboard/admin/create/createRepo/createRepo"));
const LazyReports = lazy(() => import("./screens/dashboard/admin/reports/reports"));
const LazyPmRequestUser = lazy(() => import("./screens/dashboard/admin/pmRequests/pmRequestUser"));
const LazyPmRequestForm = lazy(() => import("./screens/dashboard/projectManager/pmRequestForm"));
const LazyAddPm = lazy(() => import("./screens/dashboard/admin/create/addPmGit/addPm"));
const LazyAddUser = lazy(() => import("./screens/dashboard/admin/create/addUserGit/addUser"));
const LazyFigmaRead = lazy(() => import("./screens/dashboard/admin/figma/figmaRead/figmaRead"));
const LazyFigmaCreate = lazy(() => import("./screens/dashboard/admin/figma/figmaCreateUser"));
const LazyRepoPmDashboard = lazy(
  () => import("./screens/dashboard/projectManager/repoPmDashboard")
);
const LazyCreateFigmaDetails = lazy(
  () => import("./screens/dashboard/admin/figma/createFigma/createFigmaDetails")
);
const LazyUserHistory = lazy(() => import("./screens/dashboard/admin/userHistory/userHistory"));
const LazyUserProjects = lazy(() => import("./screens/dashboard/userDashboard/userProjects"));
const LazyLogin = lazy(() => import("./screens/login/login"));
const LazyRepoRead = lazy(() => import("./screens/dashboard/admin/repository/repoRead"));
const LazyUserRead = lazy(() => import("./screens/dashboard/users/userRead/userRead"));
const LazyPmDashboard = lazy(
  () => import("./screens/dashboard/projectManager/pmDashboard/pmDashboard")
);
const LazyUserRepoRead = lazy(() => import("./screens/dashboard/userDashboard/userRepoRead"));
const LazyAnalytics = lazy(() => import("./screens/dashboard/admin/analytics/analytics"));
const LazyProfile = lazy(() => import("./screens/dashboard/admin/profileAdmin/profile"));
const LazyUserProfile = lazy(() => import("./screens/dashboard/userDashboard/userProfile"));
const LazyPmProfile = lazy(() => import("./screens/dashboard/admin/profileAdmin/profile"));
const LazyAddUserName = lazy(() => import("./screens/dashboard/users/addUserNameModal"));
const LazyCreateProject = lazy(
  () => import("./screens/dashboard/admin/create/createProject/createProject")
);
const LazyAddPmUserName = lazy(() => import("./screens/dashboard/pm/addPmUsername"));
const LazyAddFile = lazy(() => import("./screens/dashboard/admin/create/addFile/addFile"));
const LazyProjectUsers = lazy(
  () => import("./screens/dashboard/admin/read/projectUsers/projectUsers")
);
const LazyAddUserProject = lazy(
  () => import("./screens/dashboard/admin/create/addUserProject/addUserProject")
);
const LazyProjectAnalytics = lazy(
  () => import("./screens/dashboard/admin/analytics/projectAnalytics")
);
const LazyProjectPms = lazy(() => import("./screens/dashboard/admin/read/projectPms"));
const LazyAddPmProject = lazy(
  () => import("./screens/dashboard/admin/create/addPmProject/addPmProject")
);
const LazyUserActivity = lazy(() => import("./screens/dashboard/users/userActivity"));
const LazyPmNotification = lazy(() => import("./screens/dashboard/projectManager/pmNotification"));
const LazyDriveDetails = lazy(
  () => import("./screens/dashboard/admin/drive/driveScreen/driveDetails")
);
const LazyCreateDriveDetails = lazy(
  () => import("./screens/dashboard/admin/drive/createDrive/createDriveDetails")
);
const LazyShowAllNotification = lazy(
  () => import("./screens/dashboard/projectManager/showAllNotification")
);

const PrivateRoutes = () => {
  let data = sessionStorage.getItem("item");
  let user = JSON.parse(data);

  let role = null;
  if (user !== null) role = user.enumRole;

  const id = user.id;
  logger.info(id);
  return (
    <>
      {role === ADMIN && (
        <Routes>
          <Route
            path="/AddPmUserName"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddPmUserName />
              </Suspense>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="/CreateProject"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreateProject />
              </Suspense>
            }
          />
          <Route
            path="/AddUserName"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddUserName />
              </Suspense>
            }
          />
          <Route
            path="/Login"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            path="/Create"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreate />
              </Suspense>
            }
          />
          <Route
            path="/RepoRead"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyRepoRead />
              </Suspense>
            }
          />
          <Route
            path="/UserRead"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserRead />
              </Suspense>
            }
          />
          <Route
            path="/PmCreate"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmCreate />
              </Suspense>
            }
          />
          <Route
            path="/PmReadNew"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmReadNew />
              </Suspense>
            }
          />
          <Route
            path="//PmUpdate/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmReadNew />
              </Suspense>
            }
          />
          <Route
            path="/UserCreate"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserCreate />
              </Suspense>
            }
          />
          <Route
            path="/CreateRepo"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreateRepo />
              </Suspense>
            }
          />
          <Route
            path="/AddPm"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddPm />
              </Suspense>
            }
          />
          <Route
            path="/addUser"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddUser />
              </Suspense>
            }
          />
          <Route
            path="/repoRead"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyRepoRead />
              </Suspense>
            }
          />
          <Route
            path="/FigmaRead"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyFigmaRead />
              </Suspense>
            }
          />
          <Route
            path="/FigmaCreate"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyFigmaCreate />
              </Suspense>
            }
          />
          <Route
            path="/UserHistory"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserHistory />
              </Suspense>
            }
          />
          <Route
            path="/Reports"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyReports />
              </Suspense>
            }
          />
          <Route
            path="/CreateFigmaDetails"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreateFigmaDetails />
              </Suspense>
            }
          />
          <Route
            path="/PmRequestUser"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmRequestUser />
              </Suspense>
            }
          />

          <Route
            path="/addFile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddFile />
              </Suspense>
            }
          />
          <Route
            path="/projectUsers"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyProjectUsers />
              </Suspense>
            }
          />
          <Route
            path="/addUserProject"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddUserProject />
              </Suspense>
            }
          />
          <Route
            path="/projectPms"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyProjectPms />
              </Suspense>
            }
          />
          <Route
            path="/addPmProject"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddPmProject />
              </Suspense>
            }
          />
          <Route
            path="/Profile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyProfile />
              </Suspense>
            }
          />
          <Route
            path="/ProjectAnalytics"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyProjectAnalytics />
              </Suspense>
            }
          />
          <Route
            path="/Analytics"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAnalytics />
              </Suspense>
            }
          />
          <Route
            path="/userActivity"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserActivity />
              </Suspense>
            }
          />
          <Route
            path="/createDriveDetails"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreateDriveDetails />
              </Suspense>
            }
          />
          <Route
            path="/ProjectDetails/:projectId/:projectName"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProjectDetails />
              </Suspense>
            }
          />
          <Route
            path="/driveDetails"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyDriveDetails />
              </Suspense>
            }
          />
          <Route
            path="/Create"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreate />
              </Suspense>
            }
          />
          <Route
            path="/addPm"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddPm />
              </Suspense>
            }
          />
          <Route
            path="/addUser"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAddUser />
              </Suspense>
            }
          />
          <Route
            path="/createdriveDetails"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyCreateDriveDetails />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      )}
      {role === PROJECT_MANAGER && (
        <Routes>
          <Route
            path="/pmDashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmDashboard />
              </Suspense>
            }
          />
          <Route
            path="/PmRequestForm"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmRequestForm />
              </Suspense>
            }
          />
          <Route
            path="/repoPmDashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyRepoPmDashboard />
              </Suspense>
            }
          />
          <Route
            path="/pmProfile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmProfile />
              </Suspense>
            }
          />
          <Route
            path="/pmNotification"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyPmNotification />
              </Suspense>
            }
          />
          <Route
            path="/showAllNotification"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyShowAllNotification />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      )}
      {role === USER && (
        <Routes>
          <Route
            path="/userProjects"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserProjects />
              </Suspense>
            }
          />
          <Route
            path="/userRepoRead"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserRepoRead />
              </Suspense>
            }
          />
          <Route
            path="/userProfile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyUserProfile />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      )}
    </>
  );
};
export default PrivateRoutes;
