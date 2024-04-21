import { Genders } from "../enums/Genders"
import { InterestViewModel } from "../viewModels/InterestViewModel"

export type LoginRequest = {
    email: string,
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

export type RegisterResponse = {
    isSuccess: boolean,
    token: string,
    tokenExpireDate: Date
}

export type SetPasswordRequest = {
    token: string,
    password: string
}