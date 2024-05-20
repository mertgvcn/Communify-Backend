import React, { useState } from 'react'
//css
import './FollowerFollowingList.css'
//icons
import { IoCloseCircleOutline } from 'react-icons/io5'
//models
import { UserInformationSummaryViewModel } from '../../../../models/viewModels/UserInformationSummaryViewModel'
//helpers
import { getFollowings } from '../../../../utils/apis/UserProfileAPI'
//components
import UserCard from './components/UserCard'

type FollowerFollowingListType = {
    setFollowerFollowingListState: React.Dispatch<React.SetStateAction<boolean>>,
    followerList: UserInformationSummaryViewModel[]
}

const FollowerFollowingList = (props: FollowerFollowingListType) => {
    const [toggle, setToggle] = useState(false)
    const [followerList, setFollowerList] = useState<UserInformationSummaryViewModel[]>(props.followerList)
    const [followingList, setFollowingList] = useState<UserInformationSummaryViewModel[]>([])

    const handleFollowers = () => {
        setToggle(false)
    }

    const handleFollowings = async () => {
        const response = await getFollowings()
        setFollowingList(response)

        setToggle(true)
    }

    return (
        <div className='follower-following-list-background'>
            <div className="follower-following-list-wrapper">

                <div className="close-button-wrapper">
                    <IoCloseCircleOutline style={{ cursor: 'pointer' }} onClick={() => props.setFollowerFollowingListState(false)} />
                </div>

                <div className="tabs">
                    <div className={`tab ${!toggle && `active`}`} onClick={handleFollowers}>
                        <span>Followers</span>
                    </div>

                    <div className={`tab ${toggle && `active`}`} onClick={handleFollowings}>
                        <span>Followings</span>
                    </div>

                </div>

                <div className="line"></div>

                <div className="content">
                    {
                        !toggle ?
                            <>
                                {followerList.map((followerInfo, idx) => (
                                    <UserCard setFollowerFollowingListState={props.setFollowerFollowingListState} userInfo={followerInfo} key={idx} />
                                ))}
                            </>
                            :
                            <>
                                {followingList.map((followingInfo, idx) => (
                                    <>
                                        <UserCard setFollowerFollowingListState={props.setFollowerFollowingListState} userInfo={followingInfo} key={idx} />
                                    </>
                                ))}
                            </>
                    }
                </div>

            </div>
        </div>
    )
}

export default FollowerFollowingList