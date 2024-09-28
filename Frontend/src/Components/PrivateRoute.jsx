import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state)=>state.auth);
    console.log(token)
    if(token !== null && token !== undefined)
        return children
    else
        return <Navigate to="/login" />
  
}

export default PrivateRoute