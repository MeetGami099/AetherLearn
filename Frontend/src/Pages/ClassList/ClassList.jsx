import React, { useEffect, useState } from 'react';
import s from './ClassList.module.css';
import { getClasses } from '../../services/operation/classroom';

const ClassList = () => {

    const [classes,setClasses] = useState({
        ownClasses:[],
        joinedClasses:[]
    });
    const [loading,setLoading]=useState(false);

    useEffect(async ()=>{
        await getClasses(setClasses,setLoading);
    },[])

    return (
        <div className={s.container}>
            {
                loading ? (<h1>Loafing</h1>) : (<h1>Loded</h1>)
            }
            
            
        </div>
    )
}

export default ClassList