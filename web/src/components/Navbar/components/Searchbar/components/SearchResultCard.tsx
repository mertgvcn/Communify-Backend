import React from 'react'
//css
import './SearchResultCard.css'
//icons
import { FaUserCircle } from "react-icons/fa";
//helpers
import { useNavigate } from 'react-router-dom';
//models
import { SearchedUserViewModel } from '../../../../../models/viewModels/SearchedUserViewModel'

type SearchResultCardType = {
    data: SearchedUserViewModel,
    setDropDownState: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchResultCard = (props: SearchResultCardType) => {
    const navigate = useNavigate()

    const handleProfileClick = () => {
        navigate("/profile", { state: { username: props.data.username } })
        props.setDropDownState(false)
    }

    return (
        <div className='search-result-card-wrapper' onClick={handleProfileClick}>
            <div className='icon'>
                <FaUserCircle />
            </div>

            <div className='info'>
                <span className='full-name'>{props.data.fullName}</span>
                <span className='username'>#{props.data.username}</span>
            </div>
        </div>
    )
}

export default SearchResultCard