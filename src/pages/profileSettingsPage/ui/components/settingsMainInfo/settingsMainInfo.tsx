import { FC } from "react";
import './settingsMainInfo.scss'
import { useSelector } from "react-redux";
import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";

const SettingsMainInfo: FC = () => {

    const user = useSelector((state: RootState) => state.user)
    return (
        <div className="settingsMainInfo">
            <div className="settingsMainInfo_avatar">

                <div className="settingsMainInfo_avatar_current">
                    <img src={user.userProfileImg} alt="profileImg" />
                </div>

                <div className="settingsMainInfo_avatar_addInfo">
                    <div className="settingsMainInfo_avatar_addInfo_main">Profile photo</div>
                    <div className="settingsMainInfo_avatar_addInfo_desc">JPG, PNG або GIF. Maximum size 5MB</div>
                    <div className="settingsMainInfo_avatar_addInfo_add">
                    <span>Add new avatar</span>
                    <input type="file" />
                    </div>
                </div>

            </div>

            <div className="profileSettingsPage_mainInfo">
                <Input type='text' placeholder='Username' label='Username'/>
                <Input type='text' placeholder='Email' label='Email'/>
                <Button variant='primary' type='button'>Submit Main info</Button>
            </div>
        </div>
    )
}

export default SettingsMainInfo