import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { Contest } from 'entities/contest';
import { Work } from 'entities/work';
import useAxios from 'shared/lib/hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { Button } from 'shared/ui/button';
import { ModalWindow } from 'shared/ui/modalWindow';
import Spinner from 'shared/ui/spinner';
import { VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';
import { CommentsSection } from 'widgets/commentsSection';
import UploadWorkModal from 'widgets/uploadWorkModal';
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview';

import { selectContestMedia, selectContestOwnerId } from '../model/selectors';
import { fetchMediaWorks } from '../model/services';
import { contestWorksActions } from '../model/slice';

import DescriptionSection from './components/descriptionSection/descriptionSection';
import HeroSection from './components/heroSection/heroSection';
import WorksListSection from './components/worksListSection/worksListSection';

import './contestPage.scss';

const ContestPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const dispatch = useAppDispatch();

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isUploadWorkModalOpen, setIsUploadWorkModalOpen] = useState<boolean>(false);

  // для модалок
  const isModalOpen = location.state?.modal === true
  const isUploadModalOpen = location.state?.uploadModal === true

  const ownerId = useAppSelector(selectContestOwnerId);
  const media = useAppSelector(selectContestMedia);

  const { data, isLoading, error } = useAxios<Contest>(`contests/${id}`);

  // пагинация ворков
  useEffect(() => {
    if (!id) return;
    if (id !== ownerId) {
      dispatch(contestWorksActions.setOwnerId(id));
      dispatch(contestWorksActions.resetState());
    }

    if (id !== ownerId || !media.new.length) {
      dispatch(fetchMediaWorks(id));
    }
  }, [dispatch, id, ownerId, media.new.length]);

  useEffect(() => {
    if (data) {
      dispatch(contestWorksActions.setPrizes(data.prizes));
    }
  }, [dispatch, data]);

  // ресайзер (не используется)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!id) {
    return (
      <div className="contest__error-message">
        <Text Tag="p" bold size="xl">
          Something went wrong
        </Text>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner center />;
  }

  if (!data) {
    return (
      <div className="contest__error-message">
        <Text Tag="p" bold size="xl">
          Request error{`: ${error?.message}`}
        </Text>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  // открытие модалки ворка
  const openModal = (work: Work) => {
    const scrollY = window.scrollY;
    
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    
    setSelectedWork(work);
    navigate('', {
        state: { modal: true, scrollY },
        preventScrollReset: true
    });
  };

  // закрытие модалки
  const handleCloseWorkModal = () => {
      navigate(-1, { 
          state: { scrollY: location.state?.scrollY },
          preventScrollReset: true 
      });
  };


  const getModalMaxWidth = (work: Work | null): string => {
    return work?.typeWork === 'TEXT' ? '520px' : '100%';
  };

  const handleOpenWorkUploadModal = () => {
    // setIsUploadWorkModalOpen(true);
    const scrollY = window.scrollY;
    
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    
    navigate('', {
        state: { uploadModal: true, scrollY },
        preventScrollReset: true
    });
  };

  const handleCloseUploadModal = () => {
    navigate(-1, { 
      state: { scrollY: location.state?.scrollY },
      preventScrollReset: true 
    });
  }


  
  return (
    <VStack className="contest">
      <HeroSection bg={data.backgroundImage} owner={data.contestOwner} />

      <VStack className="contest__container">
        <DescriptionSection
          data={data}
          handleOpenWorkUploadModal={handleOpenWorkUploadModal}
        />

        <WorksListSection
          worksAmount={data.participantAmount}
          openModal={openModal}
        />

        <CommentsSection workId={id} contest />
      </VStack>

      {/* Work preview modal */}
      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          onClose={handleCloseWorkModal}
          maxWidth={getModalMaxWidth(selectedWork)}
          height={windowWidth > 1024 ? '83%' : '88%'}
          maxHeight={windowWidth >= 1024 ? '900px' : ''}
          modalContentClass="work-preview-modal"
        >
          {selectedWork && <WorkPreview work={selectedWork} />}
        </ModalWindow>
      )}

      {/* Upload work modal */}
      {isUploadModalOpen && (
        <ModalWindow
          isOpen={isUploadModalOpen}
          isOuterClose
          onClose={handleCloseUploadModal}
        >
          <UploadWorkModal contestId={data.id} />
        </ModalWindow>
      )}
    </VStack>
  );
};

export default ContestPage;
