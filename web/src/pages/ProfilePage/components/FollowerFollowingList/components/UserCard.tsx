import React from 'react'
//css
import './UserCard.css'
//icons
import { FaUserCircle } from 'react-icons/fa'
//models
import { UserInformationSummaryViewModel } from '../../../../../models/viewModels/UserInformationSummaryViewModel'
import { useNavigate } from 'react-router-dom'

type UserCardType = {
    setFollowerFollowingListState: React.Dispatch<React.SetStateAction<boolean>>,
    userInfo: UserInformationSummaryViewModel
}

const UserCard = (props: UserCardType) => {
    const navigate = useNavigate()

    const handleFollowerClick = () => {
        navigate("/profile", { state: { username: props.userInfo.username } })
        props.setFollowerFollowingListState(false)
    }

    return (
        <div className='user-card-wrapper' onClick={handleFollowerClick}>
            <div className='icon'>
                <FaUserCircle />
            </div>

            <div className='info'>
                <span className='full-name'>{props.userInfo.firstName} {props.userInfo.lastName}</span>
                <span className='username'>#{props.userInfo.username}</span>
            </div>
        </div>
    )
}

export default UserCard