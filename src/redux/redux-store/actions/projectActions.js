
import api from '../../../network/api'
import { ngrokUrl } from '../../../network/config';
import {createProjectRequest,createProjectSuccess,createProjectFailure} from './action'; 
import { toast } from 'react-toastify';

export const createProject = (projectName, projectDescription) => async (dispatch) => {
    dispatch(createProjectRequest());
  
    try {
      // Make an API call to create the project
      await api.post(`https://${ngrokUrl}/projects/create`, {
        projectName,
        projectDescription,
      });
  
      dispatch(createProjectSuccess());
     
    } catch (error) {
      dispatch(createProjectFailure(error));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
    })}
  };