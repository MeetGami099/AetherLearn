import React from 'react'
import s from './Navbar.module.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import Logo from '../../assets/aetherlearn-high-resolution-logo-black-transparent.png'
import ProfileDropdown from '../Profile/Profile';
import JoinClassroom from '../ClassroomPopup/JoinClassroom';
const Navbar = () => {
  return (
    <div className={s.navbarContainer}>
        <div className={s.leftPart}>
            <RxHamburgerMenu className={s.hamburgerIcon} />
            <img src={Logo} alt="" />
        </div>

        <div className={s.rightPart}>
            <JoinClassroom />
            <ProfileDropdown />
        </div>

    </div>
  )
}

export default Navbar