import { Outlet, Route, Routes } from 'react-router-dom'
//models
import { Roles } from '../enums/Roles'
//components
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
//pages
import HomePage from '../pages/HomePage/HomePage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SetPasswordPage from '../pages/SetPasswordPage/SetPasswordPage'

const RouterUser = () => {

    const Layout = () => {
        return (
            <>
                <Navbar role={Roles.User} />

                <div className="row">
                    <Sidebar />
                    <Outlet />
                </div>
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="/" element={<HomePage role={Roles.User} />} />
                <Route path="/home" element={<HomePage role={Roles.User} />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path="/setpassword" element={<SetPasswordPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default RouterUser