import React, { useEffect, useState } from 'react'
import s from './UploadVideo.module.css'
import { MdFileUpload } from "react-icons/md";
import UploadVideoPopup from '../../Components/UploadVideoPopup/UploadVideoPopup';
import { clearQueryParams , getQueryParam } from '../../utils/queryFunction';

const UploadVideo = () => {
  const [open,setOpen] = useState(false);

  function closeModal() { 
    clearQueryParams();
    setOpen(false)
  }

  useEffect(()=>{
    if(getQueryParam('stage')!==null){
      setOpen(true)
    }
  },[])

  return (
    <>
      <div className={s.container}>
        <div className={s.titleContainer} >
            <h1 className={s.title}>Upload Video</h1>
            <button className={s.btn} onClick={()=>setOpen(true)}> <MdFileUpload className={s.icon} /> Upload</button>
        </div>
    </div>
   {open &&  <UploadVideoPopup closeModal={closeModal} />}
    </>
  )
}

export default UploadVideo