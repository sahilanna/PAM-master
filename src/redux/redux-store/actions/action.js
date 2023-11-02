import { ngrokUrl} from "../../../network/config";
import api from "../../../network/api";
import 'react-toastify/dist/ReactToastify.css';
import * as actionTypes from './actionTypes'; // Import your action types
import logger from '/home/nineleaps/Desktop/Pratap/PAM-master/src/Assets/logger.js';

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
            logger.error("Error in fetching data", error);
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
            logger.error("Error in fetching data", error);
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
            logger.error("Error in fetching data", error);
        }
    };
};

