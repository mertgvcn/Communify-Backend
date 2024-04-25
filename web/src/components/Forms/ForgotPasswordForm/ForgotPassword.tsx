import React, { useRef, useState } from 'react'
//css
import './ForgotPassword.css'
//types
import { FormStateType } from '../RegisterForm/types/FormStateType';
//icons
import { IoMdArrowBack } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
//hooks
import useDynamicValidation from '../../../hooks/useDynamicValidation';
//helpers
import { setCookie } from '../../../utils/Cookie';
import { ForgotPasswordValidator } from '../../../validators/RegisterValidators/ForgotPasswordValidator';
import { forgotPassword } from '../../../utils/apis/AuthenticationAPI';
import toast, { Toaster } from 'react-hot-toast';
//components
import TextInput from '../../Elements/TextInput/TextInput';
import PrimaryButton from '../../Elements/Buttons/PrimaryButton/PrimaryButton';

export type ForgotPasswordDataType = {
  email: string
}

type ForgotPasswordType = {
  setForgotPasswordState: React.Dispatch<React.SetStateAction<boolean>>,
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>,
}

const ForgotPassword = (props: ForgotPasswordType) => {
  const formValidator = new ForgotPasswordValidator()

  const [formData, setFormData] = useState<ForgotPasswordDataType>({
    email: ""
  })
  const { validationErrors, errorList } = useDynamicValidation(formData, formValidator, [formData.email])
  const [buttonBlocker, setButtonBlocker] = useState(false)

  //functions
  const handleChange = (e: any) => {
    const { name, value } = e.target

    setFormData({
      ...formData, [name]: value
    })
  }

  const handleSendEmail = async () => {
    if (Object.keys(errorList).length === 0) {
      setButtonBlocker(true)
      
      const response = forgotPassword(formData.email)

      await toast.promise(
        response,
        {
          loading: 'Email sending...',
          success: <b>Email successfully sent.</b>,
          error: null
        }
      )

      setTimeout(() => {
        props.setForgotPasswordState(false)
      }, 1000)
    }

    setTimeout(() => {
      setButtonBlocker(false)
    }, 2000)
  }

  const handleBack = () => {
    toast.dismiss() //tam olarak çalışamadı
    props.setForgotPasswordState(false)
    props.setFormState({ loginFormState: true, registerFormState: false })
  }

  const handleClose = () => {
    props.setForgotPasswordState(false)
  }

  return (
    <div className='forgot-password-background'>
      <Toaster toastOptions={{ style: { fontSize: 14 } }} />

      <div className="forgot-password-wrapper">

        <div className="row">

          <div className="navigation-buttons">
            <div className='back-button'>
              <IoMdArrowBack style={{ cursor: 'pointer' }} onClick={handleBack} />
            </div>

            <div className='close-button'>
              <IoCloseCircleOutline style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </div>

          <div className="forgot-password-body">
            <span className='title'>Reset your password</span>
            <span className='information-message'>Please enter your email address below. If we find the account you will recieve an email to reset your password. Once you receive the email, click on the link to change your password.</span>

            <TextInput width={460} height={40} fontSize={16} isPassword={false}
              name='email' placeholder='Please enter your email'
              onChangeFunction={handleChange} icon={MdOutlineMail}
              errorMessage={validationErrors.email} />
          </div>

        </div>

        <div className='confirm-button'>
          <PrimaryButton width={460} height={36} value='Send an email' onClickFunction={handleSendEmail} disabled={buttonBlocker} />
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword