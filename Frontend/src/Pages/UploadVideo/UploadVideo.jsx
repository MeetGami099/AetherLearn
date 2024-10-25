import React from 'react'
import s from './UploadVideo.module.css'
import { MdFileUpload } from "react-icons/md";
import UploadVideoPopup from '../../Components/UploadVideoPopup/UploadVideoPopup';

const UploadVideo = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.titleContainer}>
            <h1 className={s.title}>Upload Video</h1>
            <button className={s.btn}> <MdFileUpload className={s.icon} /> Upload</button>
        </div>
    </div>
    <UploadVideoPopup />
    </>
  )
}

export default UploadVideo