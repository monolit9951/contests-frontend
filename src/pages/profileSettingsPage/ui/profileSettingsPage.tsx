import { FC } from 'react';

import './profileSettingsPage.scss'
import { Button } from 'shared/ui/button';
import { useDispatch } from 'react-redux';
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const ProfileSettingsPage: FC = () => {

  const disaptch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("userToken")

    disaptch(clearUser())
    navigate('/')
  }

  return (
    <div className='profileSettingsPage'>
      <div className="profileSettingsPage_header">
        <div className="profileSettingsPage_header_heading">Update profile</div>
        <div className="profileSettingsPage_header_desc">Manage your account settings</div>
      </div>

      <div className="profileSettingsPage_container">
        
        <div className="profileSettingsPage_avatar">
          <Button variant='primary' type='button' onClick={handleLogout}>Logout</Button>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettingsPage;
