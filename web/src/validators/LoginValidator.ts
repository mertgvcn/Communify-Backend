import { Validator } from "fluentvalidation-ts";
import { FormDataType } from "../components/Forms/LoginForm/LoginForm";

export class LoginValidator extends Validator<FormDataType> {
    constructor() {
        super();

        this.ruleFor("credential")
        .notEmpty().withMessage("Email or username is required")

        this.ruleFor("password")
        .notEmpty().withMessage("Password is required")
    }
}