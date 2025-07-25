import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice';
import './profileSettingsPage.scss'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert';

const ProfileSettingsPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

      <button onClick={() => {showAlert('gay', 'sex')}} type='button'>summon alert</button>

      <Alert />
    </div>
  );
};

export default ProfileSettingsPage;
