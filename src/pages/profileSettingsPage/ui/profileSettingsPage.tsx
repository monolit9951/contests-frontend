import { useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfileSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const openModal = () => {
    navigate('', { state: { modal: true } });
    setIsModalOpen(true);
    console.log(1)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (navigationType === 'POP') {
      setIsModalOpen(false);
      console.log(2)
    }
  }, [navigationType]);

  return (
    <div>
      <button onClick={openModal} type='button'>Открыть модалку</button>

      {isModalOpen && (
        <div className="modal">
          <h2>Модальное окно</h2>
          <button onClick={closeModal} type='button'>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage