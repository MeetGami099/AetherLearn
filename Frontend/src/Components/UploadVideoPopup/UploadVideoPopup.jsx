import React, { useEffect, useState } from 'react'
import s from './UploadVideoPopup.module.css'
import DragAndDropVideo from '../DragAndDropVideo/DragAndDropVideo';
import DialogTitlebar from './DialogTitlebar';
import {getQueryParam} from '../../utils/queryFunction'

const UploadVideoPopup = () => {

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
                <DialogTitlebar loading={loading} />
                
                { (stage !== "2") && (<DragAndDropVideo loading={loading} setLoading={setLoading} />) }

                { (stage == "2") &&  (<>Come to Stage 2</>)}
            </div>
        </div>
    )
}

export default UploadVideoPopup