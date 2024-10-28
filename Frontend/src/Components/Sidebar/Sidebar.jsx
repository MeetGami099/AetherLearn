import React from 'react'
import s from './Sidebar.module.css'
import { GoHome, GoPeople } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";

const Sidebar = () => {
    return (
        <div className={s.SideBarContainer}>
            <div className={s.list1}>
                <GoHome className={s.HoneIcon} />
                <p>Home</p>
            </div>
            <div className={s.seprationTitle}>
                <GoPeople className={s.HoneIcon} />
                Teaching
            </div>
            <div className={s.list2}>
                <p className={s.classListView}>BEE dsfdsf sdfsd fsdf sdf</p>
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
            </div>
            <div className={s.seprationTitle}>
                <SlGraduation className={s.HoneIcon} />
                Learning
            </div>
            <div className={s.list2}>
                <p className={s.classListView}>BEE dsfdsf sdfsd fsdf sdf</p>
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>

                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>
                { ("BEE dsfdsf sdfsd fsdf sdf".length > 15) ? (<p className={s.classListView}>BEE sdf  dsfdsf....</p>) : (<p className={s.classListView}>BEE</p>) }
                <p className={s.classListView}>CPP</p>
                <p className={s.classListView}>OS</p>

            </div>

        </div>
    )
}

export default Sidebar