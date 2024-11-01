import React, { useState } from 'react'
import s from './CreatePostPopup.module.css'
import PostForm from './PostForm';

const CreatePostPopup = ({closeModal}) => {

    const [loading, setLoading] = useState(false)

    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                <PostForm loading={loading} setLoading={setLoading} closeModal={closeModal} />
            </div>
        </div>
    )
}

export default CreatePostPopup