import React from 'react'
import s from './ClassroomOption.module.css'
import {Link , NavLink, useParams} from 'react-router-dom'
const ClassroomOption = () => {
  const {classroomID} = useParams();
  return (
    <div className={s.container}>
        <div className={s.textContainer}>
            <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/own/${classroomID}/posts`}>Posts</NavLink>
            <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/own/${classroomID}/video`}>Upload Video</NavLink>
            <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/own/${classroomID}/stream`}>Live Stream</NavLink>
            <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/own/${classroomID}/people`}>People</NavLink>
            <NavLink className={({ isActive }) => (isActive ?  s.active : s.inactive)} to={`/dashboard/own/${classroomID}/setting`}>Setting</NavLink>
        </div>
    </div>
  )
}

export default ClassroomOption