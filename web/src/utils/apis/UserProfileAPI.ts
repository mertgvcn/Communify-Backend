import axios from "axios"
import { getCookie } from "../Cookie"
import { ProfilePageViewModel } from "../../models/pageViewModels/ProfilePageViewModel"
import { UserInformationViewModel } from "../../models/viewModels/UserInformationViewModel"
import { UserInformationSummaryViewModel } from "../../models/viewModels/UserInformationSummaryViewModel"

const baseUrl = process.env.REACT_APP_BASEURL
const API_KEY = 'bearer ' + getCookie("jwt")

export const getProfilePageData = async (username: string): Promise<ProfilePageViewModel> => {
    const response = await axios.get(baseUrl + '/api/ProfilePage/GetProfilePageData',
        {
            params: {
                username: username
            },
            headers: {
                'Authorization': API_KEY
            }
        }
    )

    return response.data
}

export const getUserInformation = async (): Promise<UserInformationViewModel> => {
    const response = await axios.get(baseUrl + '/api/ProfilePage/GetUserInformation',
        {
            headers: {
                'Authorization': API_KEY
            }
        }
    )

    return response.data
}

export const getFollowers = async (): Promise<UserInformationSummaryViewModel[]> => {
    const response = await axios.get(baseUrl + '/api/ProfilePage/GetFollowers',
        {
            headers: {
                'Authorization': API_KEY
            }
        }
    )

    return response.data
}

export const getFollowings = async (): Promise<UserInformationSummaryViewModel[]> => {
    const response = await axios.get(baseUrl + '/api/ProfilePage/GetFollowings',
        {
            headers: {
                'Authorization': API_KEY
            }
        }
    )

    return response.data
}


export const toggleFollowUser = async (username: string, isFollower: boolean): Promise<boolean> => {
    const response = await axios.post(baseUrl + '/api/ProfilePage/ToggleFollowUser', {
        username: username,
        isFollower: isFollower
    },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}