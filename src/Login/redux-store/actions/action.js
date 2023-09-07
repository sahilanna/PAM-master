import { ngrokUrl} from "../../../Assets/config";
import api from "../../../Components/Dashboard/api";
import 'react-toastify/dist/ReactToastify.css';

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

export const createProject=({projectName,projectDescription})=>{
    return async(dispatchProjectCreate)=>{
        try{
            const responseCreateProject= await api.post(`https://${ngrokUrl}/api/projects/create`,{
                projectName,
                projectDescription})
                dispatchProjectCreate({type:"createProject", payload:responseCreateProject})
        }
    
    catch(error){
        console.log(error)
    }
    
}
}



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

