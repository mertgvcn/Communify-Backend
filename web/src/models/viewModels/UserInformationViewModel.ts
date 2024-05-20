import { Genders } from "../../enums/Genders";
import { InterestViewModel } from "./InterestViewModel";

export interface UserInformationViewModel {
    firstName : string;
    lastName: string;
    username : string;
    birthDate : Date;
    birthCountry : string;
    birthCity : string;
    currentCountry : string;
    currentCity : string;
    gender: Genders;
    address: string;
    phoneNumber: string;
    email: string;
    interests: InterestViewModel[];
}