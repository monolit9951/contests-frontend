import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';

const ProfileSettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const isModalOpen = location.state?.modal === true;

  const openModal = () => {
    navigate('', { state: { modal: true } }); // Добавляем шаг в историю
  };

  const closeModal = () => {
    navigate(-1); // Назад по истории
  };

  return (
    <div>
      <h1>Настройки профиля</h1>

      <button onClick={openModal} type='button'>Открыть модалку</button>

      {isModalOpen && (
        <div style={{ border: '1px solid white', padding: '20px', marginTop: '20px' }}>
          <span>Модальное окно</span>
          <button onClick={closeModal} type='button'>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
