import { ChangeEvent, FC, useState } from "react";
import { updateUserPasswords } from "pages/profileSettingsPage/model/updateProfileData";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

import './settingsPasswords.scss'

const SettingsPasswords: FC = () => {

    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordsError, setPasswordsError] = useState<string>('')
    const {showAlert, Alert} = useAlert()

    const handleOldPassword = (event: ChangeEvent<HTMLInputElement>) =>{
        setOldPassword(event.target.value)
    }

    const handleNewPassword = (event: ChangeEvent<HTMLInputElement>) =>{
        setNewPassword(event.target.value)
    }

    const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) =>{
        setConfirmPassword(event.target.value)
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
            <Input placeholder='Enter a old password' error={passwordsError} type='password' label='Old Password'onChange={handleOldPassword} value={oldPassword}/>
            <Input placeholder='Enter a new password' error={passwordsError} type='password' label='New password' onChange={handleNewPassword} value={newPassword}/>
            <Input placeholder='Enter a new password again' error={passwordsError} type='password' label='Confirm new password' onChange={handleConfirmPassword} value={confirmPassword}/>
            <Button variant='primary' type='button' onClick={handleSumbitPassords}>Submit</Button>

            <Alert />
        </div>
    )
}

export default SettingsPasswords