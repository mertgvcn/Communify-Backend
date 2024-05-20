import { BrowserRouter } from "react-router-dom"
//models
import { Roles } from "../enums/Roles"
//components
import RouterGuest from "./RouterGuest"
import RouterAdmin from "./RouterAdmin"
import RouterUser from "./RouterUser"


type RouterManagerPropType = {
    userRole: Roles
}


export default function RouterManager({ userRole }: RouterManagerPropType) {

    const redirectByRole = () => {
        if (userRole == Roles.Guest.valueOf())
            return <RouterGuest />
        else if (userRole == Roles.User.valueOf())
            return <RouterUser />
        else if (userRole == Roles.Admin.valueOf())
            return <RouterAdmin />
    }

    return (
        <BrowserRouter>
            {
                <>
                    {redirectByRole()}
                </>
            }
        </BrowserRouter>
    )
}


