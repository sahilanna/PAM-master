import axios from "axios";
import { useParams } from "react-router-dom";
import { ngrokUrl, ngrokUrlSwe } from "../../../Assets/config";
import api from "../../../Components/Dashboard/api";

//Create Project
export const createProject = ({ projectName, projectDescription,projectManagerId,gitRepoLink}) => {
    return async(dispatchU) => {
        try {
            const responseCreate = await api.post('https://64267bccd24d7e0de470e2b7.mockapi.io/Crud', {
                
                projectName,
                projectDescription,
                projectManagerId,
                
                gitRepoLink
            })
            dispatchU({type: "createProject", payload: responseCreate});
        }
        catch (error){
            console.log(error);
        }
    };
};

// `https://225f-106-51-70-135.ngrok-free.app/api/projects/update/${projectId}`
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
            const responseCreatePM = await api.post(`https://${ngrokUrl}/api/users/`, {
                
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
            const responsePMUpdate = await api.put(`https://${ngrokUrl}/api/users/update/${id}`, {
               
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
            const responseCreateUser = await api.post(`https://${ngrokUrl}/api/users/`, {
                
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
        // const {id} = useParams();
        try {
            const responseUserUpdate = await api.put(`https://${ngrokUrl}/api/users/update/${id}`, {
                
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
            const responseCreatePmGithubName = await api.post(`https://${ngrokUrl}/api/collaborators/add`, {
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


//Read
// export const readProject = ({projectId, projectName, projectDescription}) => {
//     return async(dispatch) => {
//         try {
//             const responseRead = await axios.get('https://6429847d5a40b82da4d494b2.mockapi.io/PAM', {
//                 projectId,
//                 projectName,
//                 projectDescription,
//             })
//             dispatch({type: "readProject", payload: responseRead});
//         }
//         catch (error){
//             console.log(error);
//         }
//     };
// };
