import { Validator } from "fluentvalidation-ts";
import { ChangePasswordFormData } from "../pages/ProfilePage/components/ChangePassword/ChangePassword";

export class ChangePasswordValidator extends Validator<ChangePasswordFormData> {
    passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(\S).{8,20}$/)

    constructor() {
        super();

        this.ruleFor("oldPassword")
            .notEmpty().withMessage("Current password is required")
            .matches(this.passwordPattern).withMessage("Current password must contain at least 8 characters, 1 capital letter and 1 number")

        this.ruleFor("newPassword")
            .notEmpty().withMessage("New password is required")
            .matches(this.passwordPattern).withMessage("New password must contain at least 8 characters, 1 capital letter and 1 number")

        this.ruleFor("confirmPassword")
            .must((value, context) => value === context.newPassword).withMessage("Confirm your password")
    }
}