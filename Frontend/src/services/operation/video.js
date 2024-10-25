import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { videoendpoints } from "../api";
import axios from 'axios';
import {setQueryParam} from '../../utils/queryFunction'

export async function getSignedUrl( setLoading,classroomID,file) {
  setLoading(true);

  try {
    
    const response = await apiConnector("GET", videoendpoints.GENRATE_URL+`?classroomID=${classroomID}&fileType=video/${file.name.split('.')[1]}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log(response.data.url)
    

    setQueryParam('dbId', response.data.dbId);
    setQueryParam('stage', 2);
    // uploadFile(file,response.data.url)

  } catch (error) {
    toast.error(error.message);
  }
  
  setLoading(false);
}




const uploadFile = async (file , url) => {
  

    const formData = new FormData();
    formData.append('file', file);
    console.log("Uploading...")
    try {
        const response = await axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Upload successful:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

