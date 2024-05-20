import React, { useState } from 'react'
//css
import './styles/Form2_GenderSelection.css'
//types
import { FormLocationsType } from '../types/FormLocationsType'
//models
import { Genders } from '../../../../enums/Genders';
//helpers
import toast from 'react-hot-toast';
//components
import SecondaryButton from '../../../Elements/Buttons/SecondaryButton/SecondaryButton'
import PrimaryButton from '../../../Elements/Buttons/PrimaryButton/PrimaryButton'

type Form2Type = {
    registerPages: FormLocationsType,
    setRegisterPages: React.Dispatch<React.SetStateAction<FormLocationsType>>,

    genderState: Genders | null,
    setGenderState: React.Dispatch<React.SetStateAction<Genders | null>>
}

const Form2 = (props: Form2Type) => {
    const [buttonBlocker, setButtonBlocker] = useState(false)

    const genderSelection = (selectedValue: Genders) => {
        props.setGenderState(selectedValue);
    }

    const handleNext = () => {
        setButtonBlocker(true)

        if (props.genderState != null) {
            props.setRegisterPages({
                Form1: -650,
                Form2: -650,
                Form3: 0,
                Form4: 650,
                Form5: 650,
            })
        }
        else {
            toast.error("Please select your identity", {duration: 2000})
        }

        setTimeout(() => {
            setButtonBlocker(false)
        }, 2000)
    }

    const handleBack = () => {
        props.setRegisterPages({
            Form1: 0,
            Form2: 650,
            Form3: 650,
            Form4: 650,
            Form5: 650,
        })
    }

    return (
        <form id='register-form2' style={{ left: props.registerPages.Form2 }}>

            <div className='form-body'>
                <div className='form-title'>
                    <span>How do you identify?</span>
                </div>

                <div className='gender-types'>
                    <input
                        id={props.genderState === Genders.Woman ? 'selected' : ''}
                        value="Woman" type='button'
                        onClick={() => { genderSelection(Genders.Woman) }} />
                    <input
                        id={props.genderState === Genders.Man ? 'selected' : ''}
                        value="Man" type='button'
                        onClick={() => { genderSelection(Genders.Man) }} />
                    <input
                        title="only select this if you have psycholigical problems"
                        id={props.genderState === Genders.NonBinary ? 'selected' : ''}
                        value="Non-Binary" type='button'
                        onClick={() => { genderSelection(Genders.NonBinary) }} />
                    <input
                        id={props.genderState === Genders.NotSpecified ? 'selected' : ''}
                        value="I prefer not to say" type='button'
                        onClick={() => { genderSelection(Genders.NotSpecified) }} />
                </div>
            </div>

            <div className='buttons'>
                <SecondaryButton value='Back' width={100} height={40} fontSize={16} onClickFunction={handleBack}/>
                <PrimaryButton value='Next' width={100} height={40} fontSize={16} disabled={buttonBlocker} onClickFunction={handleNext}/>
            </div>
        </form>
    )
}

export default Form2