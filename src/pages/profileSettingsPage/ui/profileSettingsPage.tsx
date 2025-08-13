import { FC } from 'react';
import './profileSettingsPage.scss'

const ProfileSettingsPage: FC = () => {

  return (
    <div className='profileSettingsPage'>
      <div className="profileSettingsPage_header">
        <div className="profileSettingsPage_header_heading">Update profile</div>
        <div className="profileSettingsPage_header_desc">Manage your account settings</div>
      </div>

      <div className="profileSettingsPage_container">
        
        <div className="profileSettingsPage_avatar">
          avatar
        </div>

      </div>
    </div>
  );
};

export default ProfileSettingsPage;
