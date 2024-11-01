import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { videoendpoints ,postendpoints } from "../api";
import axios from 'axios';
import {setQueryParam} from '../../utils/queryFunction'

export async function createPost(description ,classroomID, setLoading,closeModal) {
    setLoading(true);
  
    try {
      
      const response = await apiConnector("POST", postendpoints.CREATE_POST , {description,classroomId:classroomID});
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      console.log(response.data)
      closeModal();
    
    } catch (error) {
      toast.error(error.message);
    }
    
    setLoading(false);
}

export async function getPost( classroomID, setLoading,setData) {
    setLoading(true);
  
    try {
      
      const response = await apiConnector("GET", postendpoints.GET_POST+`?classroomId=${classroomID}`);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      console.log(response.data)
      setData(response.data.data)
    
    } catch (error) {
      toast.error(error.message);
    }
    
    setLoading(false);
}