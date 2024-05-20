import React, { useState } from 'react'
//css
import './styles/Form4_Interests.css'
//types
import { FormDataType } from '../types/FormDataType'
import { FormLocationsType } from '../types/FormLocationsType'
//models
import { InterestViewModel } from '../../../../models/viewModels/InterestViewModel'
import { Genders } from '../../../../enums/Genders'
//helpers
import { RegisterRequest } from '../../../../models/parameterModels/AuthenticationParameterModels'
import { register } from '../../../../utils/apis/AuthenticationAPI'
import { toast } from 'react-hot-toast'
//components
import SecondaryButton from '../../../Elements/Buttons/SecondaryButton/SecondaryButton'
import PrimaryButton from '../../../Elements/Buttons/PrimaryButton/PrimaryButton'

type Form4Type = {
    registerPages: FormLocationsType,
    setRegisterPages: React.Dispatch<React.SetStateAction<FormLocationsType>>,

    interestList: InterestViewModel[],
    selectedInterests: InterestViewModel[],
    setSelectedInterests: React.Dispatch<React.SetStateAction<InterestViewModel[]>>,

    formData: FormDataType,
    genderState: Genders | null
}

const Form4 = (props: Form4Type) => {
    const [buttonBlocker, setButtonBlocker] = useState(false)

    const handleBack = () => {
        props.setRegisterPages({
            Form1: -650,
            Form2: -650,
            Form3: 0,
            Form4: 650,
            Form5: 650,
        })
    }

    const handleNext = async () => {
        setButtonBlocker(true)

        if (props.selectedInterests.length <= 5) {
            await handleRegistration()

            props.setRegisterPages({
                Form1: -650,
                Form2: -650,
                Form3: -650,
                Form4: -650,
                Form5: 0,
            })
        }
        else {
            toast.error("Please select up to 5 interests", {duration: 2000})
        }

        setTimeout(() => {
            setButtonBlocker(false)
        }, 2000)
    }

    const handleRegistration = async () => {
        const registerRequest: RegisterRequest = {
            firstName: props.formData.firstName,
            lastName: props.formData.lastName,
            username: props.formData.username,
            phoneNumber: props.formData.phoneNumber,
            email: props.formData.email,
            birthDate: props.formData.birthDate,
            gender: props.genderState,
            birthCountry: props.formData.birthCountry,
            birthCity: props.formData.birthCity,
            currentCountry: props.formData.currentCountry,
            currentCity: props.formData.currentCity,
            address: props.formData.address,
            interests: props.selectedInterests
        }

        const response = register(registerRequest)

        await toast.promise(
            response,
            {
                loading: 'Registration in progress...',
                success: <b>Registration successful.</b>,
                error: null
            }
        )
    }

    return (
        <form id='register-form4' style={{ left: props.registerPages.Form4 }}>

            <div className="form-body">
                <div className='form-title'>
                    <span>What do you like?</span>
                </div>

                <span style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: 14, marginTop: -10, marginBottom: 5 }}>
                    Please select up to 5 interests
                </span>

                <div className='interest-list-container'>
                    {props.interestList.map((interest) => (
                        <div
                            className="interest-card"
                            id={interest.isChecked ? 'selected' : ''}
                            key={interest.id}
                            onClick={() => {
                                interest.isChecked = !interest.isChecked;

                                if (interest.isChecked)
                                    props.setSelectedInterests(oldValues => [...oldValues, interest])
                                else {
                                    props.setSelectedInterests(oldValues => { return oldValues.filter(i => i !== interest) })
                                }
                            }}>

                            <span>{interest.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='buttons'>
                <SecondaryButton value='Back' width={100} height={40} fontSize={16} onClickFunction={handleBack} />
                <PrimaryButton value='Next' width={100} height={40} fontSize={16} disabled={buttonBlocker} onClickFunction={handleNext} />
            </div>

        </form>
    )
}

export default Form4