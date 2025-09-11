import { FC, useState } from "react";
import { updateUserPasswords } from "pages/profileSettingsPage/model/updateProfileData";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { Button } from "shared/ui/button";
import PasswordInput from "shared/ui/passwordInput";

import './settingsPasswords.scss'

const SettingsPasswords: FC = () => {

    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordsError, setPasswordsError] = useState<string>('')
    const {showAlert, Alert} = useAlert()

    const handleOldPassword = (value: string) =>{
        setOldPassword(value)
    }

    const handleNewPassword = (value: string) =>{
        setNewPassword(value)
    }

    const handleConfirmPassword = (value: string) =>{
        setConfirmPassword(value)
    }

    const data2 = {
        currentPassword: oldPassword,
        newPassword,
        confirmPassword
    }


    const handleSumbitPassords = async() =>{
        try{
            await updateUserPasswords(data2)
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (error){
            setPasswordsError('Invalid passwords')
            showAlert('ERROR', 'INVALID PASSWORD')
        }
    }

    return(
        <div className="settingsPasswords">
            <PasswordInput validationText={passwordsError} type="password" changeCallBack = {handleOldPassword} value={oldPassword} placeholder="Enter old password" label="Old Password"/>
            <PasswordInput validationText={passwordsError} type="password" changeCallBack = {handleNewPassword} value={newPassword} placeholder="Enter new password" label="New Password"/>
            <PasswordInput validationText={passwordsError} type="password" changeCallBack = {handleConfirmPassword} value={confirmPassword} placeholder="Enter new password again" label="Confirm new Password"/>

            <Button variant='primary' type='button' onClick={handleSumbitPassords}>Submit</Button>

            <Alert />
        </div>
    )
}

export default SettingsPasswords