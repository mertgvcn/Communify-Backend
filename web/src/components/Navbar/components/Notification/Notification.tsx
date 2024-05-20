import React from 'react'
//css
import './Notification.css'
//models
import { NotificationViewModel } from '../../../../models/viewModels/NotificationViewModel'
//icons
import { BsThreeDots } from "react-icons/bs";
//components
import NotificationCard from './components/NotificationCard'

type NotificationType = {
    setNotificationState: React.Dispatch<React.SetStateAction<boolean>>,
    notifications: NotificationViewModel[]
}

const Notification = (props: NotificationType) => {

    return (
        <div className='notification-wrapper'>

            <div className="title">
                <span>Notifications</span>
            </div>

            <div className="line"></div>

            <div className="notifications">
                {props.notifications.map((notification, idx) => (
                    <NotificationCard setNotificationState={props.setNotificationState} notification={notification} key={idx} />
                ))}

                <div className="view-more">
                    <div className='icon'>
                        <BsThreeDots />
                    </div>

                    <div className='info'>
                        <span>View more</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification