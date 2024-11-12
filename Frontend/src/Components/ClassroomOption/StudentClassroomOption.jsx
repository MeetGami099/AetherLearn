import React from 'react'
import s from './ClassroomOption.module.css'
import { NavLink, useParams} from 'react-router-dom'

const StudentClassroomOption = () => {
    const {classroomID} = useParams();
    return (
        <div className={s.container}>
            <div className={s.textContainer}>
                <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/joined/${classroomID}/posts`}>Posts</NavLink>
                <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/joined/${classroomID}/video`}>Upload Video</NavLink>
                <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/joined/${classroomID}/stream`}>Live Stream</NavLink>
            </div>
        </div>
    )
}

export default StudentClassroomOption