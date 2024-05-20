import React from 'react'
//css
import './EditProfile.css'
//icons
import { IoCloseCircleOutline, IoLocationOutline } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { PiIdentificationCardBold, PiUserBold } from 'react-icons/pi'
import { GrPhone } from 'react-icons/gr'
import { MdOutlineMail } from 'react-icons/md'
import { TbBuildingCommunity } from 'react-icons/tb'
import { FaTrash } from "react-icons/fa";
//models
import { UserInformationViewModel } from '../../../../models/viewModels/UserInformationViewModel'
import { Genders } from '../../../../enums/Genders'
//hooks
import useDynamicValidation from '../../../../hooks/useDynamicValidation'
//helpers
import { format } from 'date-fns'
import { EditProfileValidator } from '../../../../validators/EditProfileValidator'
//compoenents
import TextInput from '../../../../components/Elements/TextInput/TextInput'

type EditProfileType = {
    editProfileData: UserInformationViewModel | null,
    setEditProfileData: React.Dispatch<React.SetStateAction<UserInformationViewModel | null>>,

    setEditProfileState: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfile = ({ editProfileData, setEditProfileData, setEditProfileState }: EditProfileType) => {
    const formValidator = new EditProfileValidator()

    const { validationErrors, errorList } = useDynamicValidation(editProfileData, formValidator,
        [editProfileData?.firstName, editProfileData?.lastName, editProfileData?.username, editProfileData?.email, editProfileData?.phoneNumber,
        editProfileData?.currentCountry, editProfileData?.currentCity, editProfileData?.address])

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setEditProfileData({
            ...editProfileData!, [name]: value
        })
    }

    return editProfileData ? (
        <div className='edit-profile-background'>
            <div className="edit-profile-wrapper">

                <div className="close-button-wrapper">
                    <IoCloseCircleOutline style={{ float: 'right', cursor: 'pointer' }} onClick={() => setEditProfileState(false)} />
                </div>

                <div className="row">

                    <div className='col' style={{ width: '25%' }}>
                        <div className='user-summary-info'>
                            <div className='icon'>
                                <FaUserCircle />
                            </div>

                            <div className='info'>
                                <span className='full-name'>{editProfileData.firstName}</span>
                                <span className='username'>#{editProfileData.username}</span>
                            </div>
                        </div>

                        <div className="line"></div>

                        <div className="user-immutable-details">
                            <div className="detail">
                                <span className='title'>Birth Date:</span>
                                <span className="value">{format(editProfileData.birthDate, "dd/MM/yyyy")}</span>
                            </div>
                            <div className="detail">
                                <span className='title'>Birth Place:</span>
                                <span className="value">{editProfileData.birthCountry}/{editProfileData.birthCity}</span>
                            </div>
                            <div className="detail">
                                <span className='title'>Gender:</span>
                                <span className="value">{Genders[editProfileData.gender]}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col" style={{ width: '50%' }}>
                        <div className="user-mutable-details">

                            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                                <div className="detail">
                                    <span className='label'>First Name</span>

                                    <TextInput name='firstName' value={editProfileData.firstName}
                                        width={270} height={36} fontSize={16} isPassword={false}
                                        icon={PiUserBold} onChangeFunction={handleChange}
                                        errorMessage={validationErrors.firstName} />
                                </div>

                                <div className="detail">
                                    <span className='label'>Last Name</span>

                                    <TextInput name='lastName' value={editProfileData.lastName}
                                        width={270} height={36} fontSize={16} isPassword={false}
                                        icon={PiUserBold} onChangeFunction={handleChange}
                                        errorMessage={validationErrors.lastName} />
                                </div>
                            </div>

                            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="detail">
                                    <span className='label'>Username</span>

                                    <TextInput name='username' value={editProfileData.username}
                                        width={270} height={36} fontSize={16} isPassword={false}
                                        icon={PiIdentificationCardBold} onChangeFunction={handleChange}
                                        errorMessage={validationErrors.username} />
                                </div>

                                <div className="detail">
                                    <span className='label'>Email</span>

                                    <TextInput name='email' value={editProfileData.email}
                                        width={270} height={36} fontSize={16} isPassword={false}
                                        icon={MdOutlineMail} onChangeFunction={handleChange}
                                        errorMessage={validationErrors.email} />
                                </div>
                            </div>

                            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="detail">
                                    <span className='label'>Phone Number</span>

                                    <TextInput name='phoneNumber' value={editProfileData.phoneNumber}
                                        width={270} height={36} fontSize={16} isPassword={false}
                                        icon={GrPhone} onChangeFunction={handleChange}
                                        errorMessage={validationErrors.phoneNumber} />
                                </div>

                                <div className="row" style={{ width: 270, justifyContent: 'space-between' }}>
                                    <div className="detail">
                                        <span className='label'>Current Country</span>

                                        <TextInput name='currentCountry' value={editProfileData.currentCountry}
                                            width={125} height={36} fontSize={16} isPassword={false}
                                            icon={IoLocationOutline} onChangeFunction={handleChange}
                                            errorMessage={validationErrors.currentCountry} />
                                    </div>

                                    <div className="detail">
                                        <span className='label'>Current City</span>

                                        <TextInput name='currentCity' value={editProfileData.currentCity}
                                            width={125} height={36} fontSize={16} isPassword={false}
                                            icon={IoLocationOutline} onChangeFunction={handleChange}
                                            errorMessage={validationErrors.currentCity} />
                                    </div>
                                </div>
                            </div>

                            <div className="detail">
                                <span className='label'>Address</span>

                                <TextInput name='address' value={editProfileData.address}
                                    width={'100%'} height={36} fontSize={16} isPassword={false}
                                    icon={TbBuildingCommunity} onChangeFunction={handleChange}
                                    errorMessage={validationErrors.address} />
                            </div>

                        </div>
                    </div>

                    <div className='col' style={{ width: '25%' }}>
                        <div className="interests-wrapper">
                            <span className='title'>Interests</span>

                            <div className="line" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}></div>

                            {editProfileData.interests.map((interest, idx) => (
                                <div className='interest' key={idx}>
                                    <span className='interest-name'>{interest.name}</span>
                                    <div className='delete-button'>
                                        <FaTrash />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </div>
        </div>
    ) : null
}

export default EditProfile