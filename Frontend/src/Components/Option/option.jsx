import { useRef, useState } from "react"
import { SlOptionsVertical } from 'react-icons/sl'; 
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Avtor from '../../assets/Avtor.png'
import './option.css'

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services/operation/authApi"


export default function Option() {
  // const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))
  // if(!user) return null


  return (
    <>
      <button className="relative" onClick={() => setOpen(true)}>
        <div className="ProfileDrop_22">
             <SlOptionsVertical />
        </div>
        {open && (
          <div onClick={(e) => e.stopPropagation()} ref={ref} className="DropDownContainer_22" >

            <div className="linkAtDropDown_22">
              Edit
            </div>
            <div className="linkAtDropDown_22">
              Delete
            </div>
          </div>
        )}
      </button>
    </>
  )
}