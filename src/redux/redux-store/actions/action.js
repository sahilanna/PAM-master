import { ngrokUrl} from "../../../network/config";
import api from "../../../network/api";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify'
import * as actionTypes from './actionTypes'; // Import your action types

export const createProjectRequest = () => ({
  type: actionTypes.CREATE_PROJECT_REQUEST,
});
 
export const createProjectSuccess = () => ({
  type: actionTypes.CREATE_PROJECT_SUCCESS,
});

export const createProjectFailure = (error) => ({
  type: actionTypes.CREATE_PROJECT_FAILURE,
  payload: error,
});






//Create Project
// export const createProject = ({ projectName, projectDescription,projectManagerId,gitRepoLink}) => {
//     return async(dispatchU) => {
//         try {
//             const responseCreate = await api.post('https://64267bccd24d7e0de470e2b7.mockapi.io/Crud', {
                
//                 projectName,
//                 projectDescription,
//                 projectManagerId,
                
//                 gitRepoLink
//             })
//             toast.success('Project created successfully!', {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 3000,
//               })
//             dispatchU({type: "createProject", payload: responseCreate});
            
//         }
//         catch (error){
//             console.log(error);
//             toast.error('Failed. Please try again.', {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 3000,
//               });
//         }
//     };
// };


//Update Project
export const updateProject = ({projectId, projectName, projectDescription, repo}) => {
    return async(dispatchU) => {
        try {
            const responseUpdate = await api.put(`https://64267bccd24d7e0de470e2b7.mockapi.io/Crud/${projectId}`, {
                projectId,
                projectName,
                projectDescription,
                repo
            })
            dispatchU({type: "updateProject", payload: responseUpdate});
        }
        catch (error){
            console.log(error);
        }
    };
};


//Create PM
export const createPM = ({ name, email,enumRole}) => {
    return async(dispatchPMUpdate) => {
        try {
            const responseCreatePM = await api.post(`https://${ngrokUrl}/users/`, {
                
                name,
                email,
                enumRole,
                
            })
            dispatchPMUpdate({type: "createPM", payload: responseCreatePM});
        }
        catch (error){
            console.log(error);
        }
    };
};



//Update PM
export const updatePM = ({ id,name, email, githubUsername, enumRole}) => {
    return async(dispatchPM) => {
        try {
            const responsePMUpdate = await api.put(`https://${ngrokUrl}/users/update/${id}`, {
               
                name,
                email,
                githubUsername,
                enumRole
            })
            dispatchPM({type: "updatePM", payload: responsePMUpdate});
        }
        catch (error){
            console.log(error);
        }
    };
};



//create user

export const createUser = ({ name, email, enumRole}) => {
    return async(dispatchUserUpdate) => {
        try {
            const responseCreateUser = await api.post(`https://${ngrokUrl}/users/`, {
                
                name,
                email,
                enumRole
            })

            dispatchUserUpdate({type: "createUser", payload: responseCreateUser});
        }
        catch (error){
            console.log(error);
        }
    };
};



//Update USER
export const updateUser = ({ id,name, email, enumRole}) => {
    return async(dispatchUser) => {
        
        try {
            const responseUserUpdate = await api.put(`https://${ngrokUrl}/users/update/${id}`, {
                
                name,
                email,
                
                enumRole
            })
            dispatchUser({type: "updatePM", payload: responseUserUpdate});
        }
        catch (error){
            console.log(error);
        }
    };
};


export const createPmGithubName = ({projectName, repo, username}) => {
    return async(dispatchPmGithub) => {
        try {
            const responseCreatePmGithubName = await api.post(`https://${ngrokUrl}/collaborators/add`, {
                projectName,
                repo,
                username
            })
            dispatchPmGithub({type: "createPmGithubName", payload: responseCreatePmGithubName});
        }
        catch (error){
            console.log(error);
        }
    };
};

