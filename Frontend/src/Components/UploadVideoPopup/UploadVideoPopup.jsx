import React, { useEffect, useState } from 'react'
import s from './UploadVideoPopup.module.css'
import DragAndDropVideo from '../DragAndDropVideo/DragAndDropVideo';
import {getQueryParam} from '../../utils/queryFunction'
import VideoUploadDetails from '../VideoUploadDetails/VideoUploadDetails';

const UploadVideoPopup = ({closeModal}) => {

    const [loading,setLoading] = useState(false)
    const [stage,setStage] = useState(getQueryParam('stage'))

    useEffect(()=>{
        setStage(getQueryParam('stage'))
        console.log("Rendred")
    },(getQueryParam('stage')))

    console.log(stage)
    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                
                { (stage !== "2") && (<DragAndDropVideo loading={loading} setLoading={setLoading} closeModal={closeModal} />) }

                { (stage == "2") &&  (<VideoUploadDetails loading={loading} setLoading={setLoading} closeModal={closeModal} />)}
            </div>
        </div>
    )
}

export default UploadVideoPopup