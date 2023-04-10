import axios from "axios";

//Create
export const createProject = ({projectId, projectName, projectDescription}) => {
    return async(dispatch) => {
        try {
            const responseCreate = await axios.post('https://279c-106-51-70-135.ngrok-free.app/api/projects/', {
                projectId,
                projectName,
                projectDescription,
            })
            dispatch({type: "createProject", payload: responseCreate});
        }
        catch (error){
            console.log(error);
        }
    };
};




//Read
export const readProject = ({projectId, projectName, projectDescription}) => {
    return async(dispatch) => {
        try {
            const responseRead = await axios.get('https://279c-106-51-70-135.ngrok-free.app/api/projects/allProjects', {
                projectId,
                projectName,
                projectDescription,
            })
            dispatch({type: "readProject", payload: responseRead});
        }
        catch (error){
            console.log(error);
        }
    };
};




//Update
export const updateProject = ({projectId, projectName, projectDescription}) => {
    return async(dispatch) => {
        try {
            const responseUpdate = await axios.put('https://6429847d5a40b82da4d494b2.mockapi.io/PAM', {
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

