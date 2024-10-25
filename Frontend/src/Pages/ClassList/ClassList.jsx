import React, { useEffect, useState } from 'react';
import s from './ClassList.module.css';
import { getClasses } from '../../services/operation/classroom';
import { Link } from 'react-router-dom'
import ClassroomCard from '../../Components/ClassroomCard/ClassroomCard';
const ClassList = () => {

    const [classes, setClasses] = useState({
        ownClasses: [],
        joinedClasses: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getClasses(setClasses, setLoading);
    }, [])

    return (
        <div className={s.container}>
            {
                loading ? (<h1>Loading</h1>) : (<>
                    {

                        classes.ownClasses.length == 0 ? (<>You dont own any Clsses</>) : (<>
                            <h1 className={s.h1Title}>Your Classes</h1>
                            {
                                classes.ownClasses.map((item, index) => (
                                    <Link to={`/dashboard/own/${item._id}`}>
                                        <ClassroomCard item={item} />
                                    </Link>
                                ))
                            }
                            <h1 className={s.h1Title}>Joined Classes</h1>
                            {
                                classes.joinedClasses.map((item, index) => (
                                    <Link to={`/dashboard/joined/${item._id}`}>
                                        <ClassroomCard item={item} />
                                    </Link>
                                ))
                            }
                        </>)
                    }
                </>)
            }
        </div>
    )
}

export default ClassList