import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import s from './Dashboard.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Outlet} from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className={s.DashboardContainer}>
            <Navbar />
            <div className={s.ContentContainer}>
                <Sidebar />
                <div className={s.pagesBox}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard