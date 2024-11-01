import React from 'react'
import s from './ContentDisplayCard.module.css'
import { SlOptionsVertical } from 'react-icons/sl'; 
import Option from '../Option/option';

const ContentDisplayCard = ({ item, Icon }) => {
    const { userId, createdAt, title, description } = item;

    return (
        <div className={s.videoContainer}>

            {/* Uploader Details */}

            <div className={s.uploaderDetails}>
                <div className={s.detailsWrapper}>
                    <div className={s.badge}>
                        <p>{userId.firstName[0]}</p>
                    </div>
                    <div>
                        <p className={s.names}>{userId.firstName} {userId.lastName}</p>
                        {
                            createdAt && <p className={s.date}>{createdAt.split('T')[0]}</p>
                        }
                    </div>
                </div>
                <div className={s.optionContaienr}>
                    <Option />
                </div>
            </div>

            {/* Video Display  */}

            <div className={s.videoDisplay}>
                <div className={s.imgConatiner}> <Icon /></div>
                <div className={s.postContent}>
                    <p>{title}</p>
                    <p className={s.cotentType}>VIDEO</p>
                </div>
            </div>

            <div className={s.decriptionBox}>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ContentDisplayCard;
