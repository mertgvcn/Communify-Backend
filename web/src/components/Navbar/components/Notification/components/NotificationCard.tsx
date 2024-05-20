import React from 'react'
//css
import './NotificationCard.css'
//icon
import { FaUserCircle } from 'react-icons/fa'
//models
import { NotificationViewModel } from '../../../../../models/viewModels/NotificationViewModel'
//helpers
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns/format'

type NotificationCardType = {
    setNotificationState: React.Dispatch<React.SetStateAction<boolean>>,
    notification: NotificationViewModel
}

const NotificationCard = (props: NotificationCardType) => {
    const navigate = useNavigate()

    const handleNotification = () => {
        var username = props.notification.message.split(" ")[0]

        navigate("/profile", { state: { username: username } })
        props.setNotificationState(false)
    }

    return (
        <div className='notification-card-wrapper' onClick={handleNotification}>
            <div className='icon'>
                <FaUserCircle />
            </div>

            <div className='info'>
                <span className='message'>{props.notification.message}</span>
                <span className='date'>{format(props.notification.dateCreated, "dd/MM/yyyy HH:mm")}</span>
            </div>
        </div>
    )
}

export default NotificationCard