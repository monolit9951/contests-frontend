import { FC } from 'react';
// eslint-disable-next-line
import { Helmet } from "react-helmet-async";
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice';

import SettingsMainInfo from './components/settingsMainInfo/settingsMainInfo';
import SettingsPasswords from './components/settingsPasswords/settingsPasswords';

import './profileSettingsPage.scss'

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
