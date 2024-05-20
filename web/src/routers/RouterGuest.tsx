import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
//models
import { Roles } from '../enums/Roles';
//components
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
//pages
import HomePage from '../pages/HomePage/HomePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import SetPasswordPage from '../pages/SetPasswordPage/SetPasswordPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

const RouterGuest = () => {
    const location = useLocation()

    const Layout = () => {
        return (
            <>
                <Navbar role={Roles.Guest} loginFormState={location.state?.loginFormState} />

                <div className="row">
                    <Sidebar />
                    <Outlet />
                </div>
            </>
        )
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path="/" element={<HomePage role={Roles.Guest} />} />
                    <Route path="/home" element={<HomePage role={Roles.Guest} />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path="/setpassword" element={<SetPasswordPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default RouterGuest;
