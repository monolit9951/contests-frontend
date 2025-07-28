import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert';
import { Button } from 'shared/ui/button';
import { ModalWindow } from 'shared/ui/modalWindow';
import ModalReport from 'widgets/modalReport';
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice';

import './profileSettingsPage.scss'

const ProfileSettingsPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [modalReport, setModalReport] = useState<boolean>(false)

  const handleExit = () => {
    // console.log('exit')
    localStorage.removeItem('userToken')
    dispatch(clearUser())
    navigate('/')
  }

  const {showAlert, Alert} = useAlert()

  return (
    <div className='profileSettingsPage'>
      <h1>Настройки профиля</h1>

      <Button type='button' variant='primary' className='exitButton' onClick={handleExit} >Exit profile</Button>

      <button onClick={() => {showAlert('primary text', 'secondary text')}} type='button'>summon alert</button>
      <button type='button' onClick={() => setModalReport(true)}>Report test</button>
      <Alert />

      {modalReport && <ModalWindow isOpen onClose={() => setModalReport(false)}><ModalReport targetId='sdsd' targetType='COMMENT'/></ModalWindow>}
    </div>
  );
};

export default ProfileSettingsPage;
