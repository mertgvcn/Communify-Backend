import React, { useState } from 'react'
//css
import './RegisterForm.css'
//types
import { FormLocationsType } from './types/FormLocationsType'
import { FormStateType } from './types/FormStateType'
import { FormDataType } from './types/FormDataType'
//models
import { Gender } from '../../../models/entityModels/User'
import { InterestViewModel } from '../../../models/viewModels/InterestModels'
//icons
import { IoCloseCircleOutline } from 'react-icons/io5'
//components
import SecondaryButton from '../../Elements/Buttons/SecondaryButton/SecondaryButton'
import Form1_PersonalInfo from './components/Form1_PersonalInfo'
import Form2_GenderSelection from './components/Form2_GenderSelection'
import Form3_Locations from './components/Form3_Locations'
import Form4_Interests from './components/Form4_Interests'
import Form5_DoneNotification from './components/Form5_DoneNotification'


type RegisterFormType = {
    setFormState: React.Dispatch<React.SetStateAction<FormStateType>>,

    interestList: InterestViewModel[]
}


const RegisterForm = (props: RegisterFormType) => {

    //States
    const [registerPages, setRegisterPages] = useState<FormLocationsType>({
        Form1: 0,
        Form2: 600,
        Form3: 600,
        Form4: 600,
        Form5: 600
    })

    const [formData, setFormData] = useState<FormDataType>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
        email: "",
        birthCountry: "",
        birthCity: "",
        currentCountry: "",
        currentCity: "",
        address: "",
    })

    const [genderState, setGenderState] = useState<Gender | null>(null)
    const [selectedInterests, setSelectedInterests] = useState<InterestViewModel[]>([])

    return (
        <div className='register-form-background'>
            <div className='register-form-wrapper'>

                {/* GO LOGIN SIDE */}
                <div className="go-login" style={
                    {
                        backgroundImage: `url(${require("../../../assets/images/login-form-pic.png")}`,
                    }
                }>
                    <div className="go-login-body">
                        <p style={{ fontSize: 22 }}  >Do you already have an account?</p>
                        <span style={{ fontSize: 14, opacity: 0.9 }}>Login to your account and continue communifying with our active communities.</span>

                        <div style={{ marginTop: 25 }}>
                            <SecondaryButton value={'Sign in'} width={120} height={40} fontSize={16}
                                onClickFunction={() => {
                                    props.setFormState({ loginFormState: true, registerFormState: false })
                                    setGenderState(null)
                                    setSelectedInterests([])
                                }} />
                        </div>
                    </div>
                </div>

                {/* REGISTRATION SIDE */}
                <div className="register-form">
                    <div className='close-button'>
                        <IoCloseCircleOutline style={{ float: 'right', cursor: 'pointer' }}
                            onClick={() => {
                                setRegisterPages({
                                    Form1: 0,
                                    Form2: 650,
                                    Form3: 650,
                                    Form4: 650,
                                    Form5: 650
                                })
                                props.setFormState({ loginFormState: false, registerFormState: false })
                                setFormData({
                                    firstName: "",
                                    lastName: "",
                                    phoneNumber: "",
                                    birthDate: "",
                                    email: "",
                                    birthCountry: "",
                                    birthCity: "",
                                    currentCountry: "",
                                    currentCity: "",
                                    address: "",
                                })
                                setGenderState(null)
                                setSelectedInterests([])
                            }} />
                    </div>

                    <div className='register-form-logo-container'>
                        <div className='register-form-logo'>
                            <img src={require(`../../../assets/logos/small_logo.png`)} alt="img not found" />
                        </div>
                    </div>

                    <div className='register-forms' style={{ position: 'relative' }}>
                        <Form1_PersonalInfo registerPages={registerPages} setRegisterPages={setRegisterPages}
                            formData={formData} setFormData={setFormData} />

                        <Form2_GenderSelection registerPages={registerPages} setRegisterPages={setRegisterPages}
                            genderState={genderState} setGenderState={setGenderState} />

                        <Form3_Locations registerPages={registerPages} setRegisterPages={setRegisterPages}
                            formData={formData} setFormData={setFormData} />

                        <Form4_Interests registerPages={registerPages} setRegisterPages={setRegisterPages}
                            interestList={props.interestList}
                            selectedInterests={selectedInterests}
                            setSelectedInterests={setSelectedInterests}
                            formData={formData}
                            genderState={genderState} />

                        <Form5_DoneNotification registerPages={registerPages} setRegisterPages={setRegisterPages}
                            setFormState={props.setFormState} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterForm