import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "entities/user";
import { getUserById, updateUserMainInfo } from "pages/profileSettingsPage/model/updateProfileData";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";
import { Input, Textarea } from "shared/ui/input";

import './settingsMainInfo.scss'

const SettingsMainInfo: FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const [userName, setUserName] = useState<string>(user.userName)
    const [name, setName] = useState<string>('')
    const [newAvatar, setNewAvatar] = useState(null)
    const [newAvatarLink, setNewAvatarLink] = useState<string | ArrayBuffer | null>(null)
    const [bio, setBio] = useState<string>('')

    
    // запрос на получение информации
    const {data: userData, isLoaded: userDataIsLoaded} = useGetRequest<User>({fetchFunc: () => getUserById(user.userId), key: [], enabled: true})

    useEffect(() => {
        if(userData && userDataIsLoaded){
            setName(userData.name)
            setBio(userData.aboutMe? userData.aboutMe : '')
            setUserName(userData.username)
        }
    }, [userData, userDataIsLoaded])


    // запрос на обновление информации
    const updateUserInfo = async() => {
        try{
            await updateUserMainInfo({
                id: user.userId, 
                username: userName, 
                name: userName, 
                profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
                aboutMe: bio 
            })

            // также делать диспатч на сетюзер
        } catch{
            console.log('error')
        }
    }


    // отловить изменение никнейма
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }


    // отловить изменение нейма
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }


    // отловить изменение фото
    const handleAvatarUpload = (event: any) => {
        const file = event.target.files[0]
        setNewAvatar(file)
        const reader = new FileReader()

        reader.onload = () =>{
            setNewAvatarLink(reader.result)
        }

        reader.readAsDataURL(file)
    }


    // отловить био
    const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value)
    }




    return (
        <div className="settingsMainInfo">
            <div className="settingsMainInfo_avatar">

                <div className="settingsMainInfo_avatar_current">
                    <img src={newAvatar? newAvatarLink : user.userProfileImg} alt="profileImg" />
                </div>

                <div className="settingsMainInfo_avatar_addInfo">
                    <div className="settingsMainInfo_avatar_addInfo_main">Profile photo</div>
                    <div className="settingsMainInfo_avatar_addInfo_desc">JPG, PNG або GIF. Maximum size 5MB</div>
                    <div className="settingsMainInfo_avatar_addInfo_add">
                        <span>Add new avatar</span>
                        <input type="file" onChange={handleAvatarUpload}/>
                    </div>
                </div>

            </div>

            <div className="profileSettingsPage_mainInfo">
                <Input type='text' placeholder='Username' label='Username' value={userName} onChange={handleUsernameChange}/>
                <Input type='text' placeholder='Name' label='Name' value={name} onChange={handleNameChange}/>
            </div>

            <div className="profileSettingsPage_additional">
                <Textarea name = 'bio' placeholder="Add your bio" onChange={handleBioChange} value={bio}/>
                <Button variant = 'primary' onClick={updateUserInfo}>Submit</Button>
            </div>
        </div>
    )
}

export default SettingsMainInfo