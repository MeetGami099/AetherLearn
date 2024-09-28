import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const OpenRoute = ({children}) => {
 const {token} = useSelector((state)=>state.profile)
 const {user} = useSelector((state)=>state.profile)
 console.log("Printig At Open Route");
 console.log(token);
 console.log(user);

 if(token==null){
    return children
 }else{
    return <Navigate to={`/${user.role}`} />
 }
}

export default OpenRoute