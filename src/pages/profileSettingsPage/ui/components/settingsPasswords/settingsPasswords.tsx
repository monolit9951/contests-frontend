import { FC } from "react";
import './settingsPasswords.scss'
import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";

const SettingsPasswords: FC = () => {
    return(
        <div className="settingsPasswords">
            <Input placeholder='Enter a old password' type='password' label='Old Password'/>
            <Input placeholder='Enter a new password' type='password' label='New password'/>
            <Input placeholder='Enter a new password again' type='password' label='Confirm new password'/>
            <Button variant='primary' type='button'>Submit</Button>
        </div>
    )
}

export default SettingsPasswords