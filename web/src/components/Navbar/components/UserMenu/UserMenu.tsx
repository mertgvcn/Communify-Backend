import React from 'react'
//css
import './UserMenu.css'
//icons
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
//helpers
import { useNavigate } from 'react-router';
import { getUsername } from '../../../../utils/apis/NavbarAPI';
import { deleteCookie } from '../../../../utils/Cookie';

type userMenuType = {
    setUserMenuState: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: userMenuType) => {
    const navigate = useNavigate()

    const handleProfile = async () => {
        const username = await getUsername()

        navigate("/profile", { state: { username: username } })
        props.setUserMenuState(false)
    }

    const handleLogout = () => {
        navigate("/", { state: { loginFormState: true } })
        deleteCookie("jwt")

        setTimeout(() => {
            window.location.reload()
        }, 300)
    }

    return (
        <div className='user-menu-wrapper'>
            <ul className='list'>

                <li style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} onClick={handleProfile}>
                    <FaUser className='icon' />
                    <span>Profile</span>
                </li>

                <li>
                    <IoMdSettings className='icon' />
                    <span>Settings</span>
                </li>

                <li style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} onClick={handleLogout}>
                    <FaSignOutAlt className='icon' />
                    <span>Logout</span>
                </li>

            </ul>
        </div>
    )
}

export default UserMenu