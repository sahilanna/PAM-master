import axios from "axios";
import { useParams } from "react-router-dom";

//Create Project
export const createProject = ({projectId, projectName, projectDescription}) => {
    return async(dispatchU) => {
        try {
            const responseCreate = await axios.post('https://cc0f-106-51-70-135.ngrok-free.app/api/projects/', {
                projectId,
                projectName,
                projectDescription,
            })
            dispatchU({type: "createProject", payload: responseCreate});
        }
        catch (error){
            console.log(error);
        }
    };
};


//Create PM
export const createPM = ({id, name, email, enumRole}) => {
    return async(dispatchPM) => {
        try {
            const responseCreatePM = await axios.post('https://cc0f-106-51-70-135.ngrok-free.app/api/users/', {
                id,
                name,
                email,
                enumRole
            })
            dispatchPM({type: "createPM", payload: responseCreatePM});
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




//Update Project
export const updateProject = ({projectId, projectName, projectDescription}) => {
    return async(dispatch) => {
        // const {id} = useParams();
        try {
            const responseUpdate = await axios.put(`https://cc0f-106-51-70-135.ngrok-free.app/api/projects/update/${projectId}`, {
                projectId,
                projectName,
                projectDescription,
            })
            dispatch({type: "updateProject", payload: responseUpdate});
        }
        catch (error){
            console.log(error);
        }
    };
};


//Update PM
export const updatePM = ({id, name, email}) => {
    return async(dispatchPMUpdate) => {
        // const {id} = useParams();
        try {
            const responsePMUpdate = await axios.put(`https://cc0f-106-51-70-135.ngrok-free.app/api/users/update/${id}`, {
                id,
                name,
                email,
            })
            dispatchPMUpdate({type: "updatePM", payload: responsePMUpdate});
        }
        catch (error){
            console.log(error);
        }
    };
};