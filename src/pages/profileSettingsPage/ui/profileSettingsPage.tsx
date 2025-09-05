import { FC } from 'react';
// eslint-disable-next-line
import { Helmet } from "react-helmet-async";

import SettingsMainInfo from './components/settingsMainInfo/settingsMainInfo';
import SettingsPasswords from './components/settingsPasswords/settingsPasswords';

import './profileSettingsPage.scss'

const ProfileSettingsPage: FC = () => {


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

    </div>
  );
};

export default ProfileSettingsPage;
