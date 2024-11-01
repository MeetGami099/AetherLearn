import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { classendpoints } from "../api";

export async function createClass(
  name,
  description,
  subject,
  setLoading,
  setShowCode
) {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector("POST", classendpoints.CREATE_API, {
      name,
      description,
      subject,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Created");
    setShowCode({
      open: true,
      code: response.data.data.classCode,
    });
  } catch (error) {
    toast.error("Could Not Create");
  }
  setLoading(false);
  toast.dismiss(toastId);
}

export async function joinClass(classCode, setLoading, setOpen) {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector("POST", classendpoints.JOIN_API, {
      classCode,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Joined");
    setOpen(false);
  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
  toast.dismiss(toastId);
}


export async function getClasses(setClasses, setLoading) {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector("GET", classendpoints.GET_CLASSES);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setClasses({
      joinedClasses:response.data.joinedClasses,
      ownClasses:response.data.ownClasses
    });
    
  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
  toast.dismiss(toastId);
}