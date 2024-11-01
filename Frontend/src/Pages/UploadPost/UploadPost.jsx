import React, {useState } from 'react'
import s from './UploadPost.module.css'
import { MdFileUpload } from "react-icons/md";
import CreatePostPopup from '../../Components/CreatePostPopup/CreatePostPopup';
import PostListAdmin from '../../Components/PostListAdmin/PostListAdmin';

const UploadPost = () => {
    const [open,setOpen] = useState(false);


    function closeModal() { 
      setOpen(false)
    }
  
  return (
    <>
        <div className={s.container}>
            <div className={s.titleContainer} >
                <h1 className={s.title}>Posts</h1>
                <button className={s.btn} onClick={()=>setOpen(true)}> <MdFileUpload className={s.icon} /> Create</button>
            </div>
           <PostListAdmin />
        </div>
        {open &&  <CreatePostPopup closeModal={closeModal} />}
    </>
  )
}

export default UploadPost