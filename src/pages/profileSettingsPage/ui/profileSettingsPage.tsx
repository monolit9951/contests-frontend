import { FC } from 'react';
// eslint-disable-next-line
import { Helmet } from "react-helmet-async";
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice';

import './profileSettingsPage.scss'
import SettingsMainInfo from './components/settingsMainInfo/settingsMainInfo';
import SettingsPasswords from './components/settingsPasswords/settingsPasswords';

const ProfileSettingsPage: FC = () => {

  const disaptch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("userToken")

    disaptch(clearUser())
    navigate('/')
  }

  // const user = useSelector((state: RootState) => state.user)

  return (
    <div className='profileSettingsPage'>

      <Helmet>
          <title>DareBay | Profile | Settings</title>
          <meta property="og:title" content='Profile settings' />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta name="description"  content='Profile settings page' />
          <meta property="og:description" content='Profile settings page' />
      </Helmet>

      <div className="profileSettingsPage_header">
        <div className="profileSettingsPage_header_heading">Update profile</div>
        <div className="profileSettingsPage_header_desc">Manage your account settings</div>
      </div>

      {/* <div className="profileSettingsPage_container">
        
        <div className="profileSettingsPage_avatar">

          <div className="profileSettingsPage_avatar_current">
            <img src={user.userProfileImg} alt="profileImg" />
          </div>

          <div className="profileSettingsPage_avatar_addInfo">
            <div className="profileSettingsPage_avatar_addInfo_main">Profile photo</div>
            <div className="profileSettingsPage_avatar_addInfo_desc">JPG, PNG або GIF. Maximum size 5MB</div>
            <div className="profileSettingsPage_avatar_addInfo_add">
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
        
        <div className="profileSettingsPage_passwordInfo">
          <Input placeholder='Enter a old password' type='password' label='Old Password'/>
          <Input placeholder='Enter a new password' type='password' label='New password'/>
          <Input placeholder='Enter a new password again' type='password' label='Confirm new password'/>
          <Button variant='primary' type='button'>Submit</Button>
        </div>

        <div className="profileSettingsPage_extraInfo">
          <Textarea name='Extra' label='Enter bio' placeholder='Enter bio'/>
        </div>

        <div className="profileSettingsPage_exitDelete">
          <Button variant='primary' type='button' onClick={handleLogout}>Logout</Button>
          <Button variant='primary' type='button' onClick={handleLogout}>Delete account</Button>
        </div>
      </div> */}

      <SettingsMainInfo />
      <SettingsPasswords />

      <div className="profileSettingsPage_exitDelete">
        <Button variant='primary' type='button' onClick={handleLogout}>Logout</Button>
        <Button variant='primary' type='button' onClick={handleLogout}>Delete account</Button>
      </div>

    </div>
  );
};

export default ProfileSettingsPage;
