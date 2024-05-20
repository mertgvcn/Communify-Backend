import { Genders } from "../../enums/Genders"
import { InterestViewModel } from "../viewModels/InterestViewModel"

export type LoginRequest = {
    credential: string,
    password: string
}

export type LoginResponse = {
    authenticateResult: boolean,
    authToken: string,
    accessTokenExpireDate: Date,
    replyMessage: string,
    role: string
}

export type RegisterRequest = {
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    email: string,
    birthDate: string,
    gender: Genders | null,
    birthCountry: string,
    birthCity: string,
    currentCountry: string,
    currentCity: string,
    address: string,
    interests: InterestViewModel[]
}

export type SetPasswordRequest = {
    token: string,
    password: string
}

export type ChangePasswordRequest = {
    oldPassword: string,
    newPassword: string
}

export type ChangePasswordResponse = {
    replyMessage : string,
    isSuccess : boolean
}