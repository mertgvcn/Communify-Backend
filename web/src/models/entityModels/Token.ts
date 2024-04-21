import { IBaseEntity } from "./BaseEntity";
import { User } from "./User";

export interface PasswordToken extends IBaseEntity { //view model oluştur ve, token ve expireDate olsun
    token : string,
    expireDate : Date,
    userId : number,
    user: User
}

export interface Token {
    role : string;
    aud : string;
    exp : number;
    iss : string;
    nbf : number;
}

export enum Roles {
    Guest = 0,
    Admin = 1,
    User = 2,
}