import React, { useEffect, useState } from 'react'
//css
import "./ChangePassword.css"
//helpers

import toast, { Toaster } from 'react-hot-toast'
import TextInput from '../../../../components/Elements/TextInput/TextInput'
import { RiLockPasswordLine } from 'react-icons/ri'
import PrimaryButton from '../../../../components/Elements/Buttons/PrimaryButton/PrimaryButton'
import { IoCloseCircleOutline } from 'react-icons/io5'
import useDynamicValidation from '../../../../hooks/useDynamicValidation'
import { ChangePasswordValidator } from '../../../../validators/ChangePasswordValidator'
import { ChangePasswordRequest } from '../../../../models/parameterModels/AuthenticationParameterModels'
import { changePassword } from '../../../../utils/apis/AuthenticationAPI'
import { Encrypt } from '../../../../utils/Cryption'

export type ChangePasswordFormData = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

type ChangePasswordType = {
    setChangePasswordState: React.Dispatch<React.SetStateAction<boolean>>,
}

const ChangePassword = (props: ChangePasswordType) => {

    //states
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [buttonBlocker, setButtonBlocker] = useState(false)

    const formValidator = new ChangePasswordValidator()
    const { validationErrors, errorList } = useDynamicValidation(formData, formValidator, [formData.oldPassword, formData.newPassword, formData.confirmPassword])

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = async () => {
        if(Object.keys(errorList).length !== 0) return;

        setButtonBlocker(true)

        const changePasswordRequest: ChangePasswordRequest = {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        }
        const response = await changePassword(changePasswordRequest)

        if (response.status == 200) {
            toast.success(response.data)

            setTimeout(() => {
                props.setChangePasswordState(false)
            }, 1000)
        }
        else {
            toast.error(response.data)
        }
        
        setButtonBlocker(false)
    }

    return (
        <div className="change-password-background">
            <Toaster toastOptions={{ style: { fontSize: 14 } }} />

            <div className='change-password-wrapper'>

                <div className="close-button-wrapper">
                    <IoCloseCircleOutline style={{ float: 'right', cursor: 'pointer' }} onClick={() => props.setChangePasswordState(false)} />
                </div>

                <div className='change-password-form'>

                    <span className='change-password-title'>Please Set Your New Password </span>

                    <div className="inputs">
                        <TextInput name='oldPassword' placeholder="Current Password"
                            width={440} height={40} fontSize={16} isPassword={true}
                            icon={RiLockPasswordLine} onChangeFunction={handleChange}
                            errorMessage={validationErrors.oldPassword} />

                        <TextInput name='newPassword' placeholder="New Password"
                            width={440} height={40} fontSize={16} isPassword={true}
                            icon={RiLockPasswordLine} onChangeFunction={handleChange}
                            errorMessage={validationErrors.newPassword} />

                        <TextInput name='confirmPassword' placeholder="Confirm New Password"
                            width={440} height={40} fontSize={16} isPassword={true}
                            icon={RiLockPasswordLine} onChangeFunction={handleChange}
                            errorMessage={validationErrors.confirmPassword} />
                    </div>

                </div>

                <div className='submit-button-wrapper'>
                    <PrimaryButton value={'Submit'} width={280} height={40} fontSize={16} disabled={buttonBlocker} onClickFunction={handleSubmit} />
                </div>
            </div>
        </div>
    )
}
export default ChangePassword