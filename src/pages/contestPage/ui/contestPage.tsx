import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Contest } from 'entities/contest';
import useAxios from 'shared/lib/hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { Button } from 'shared/ui/button';
import { ModalWindow } from 'shared/ui/modalWindow';
import Spinner from 'shared/ui/spinner';
import { VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';
import { CommentsSection } from 'widgets/commentsSection';
import UploadWorkModal from 'widgets/uploadWorkModal';

import { selectContestMedia, selectContestOwnerId } from '../model/selectors';
import { fetchMediaWorks } from '../model/services';
import { contestWorksActions } from '../model/slice';

import DescriptionSection from './components/descriptionSection/descriptionSection';
import HeroSection from './components/heroSection/heroSection';
import WinnersSection from './components/winnersSection/winnersSection';
import WorksListSection from './components/worksListSection/worksListSection';

import './contestPage.scss';

const ContestPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  // для модалок
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

  const handleOpenWorkUploadModal = () => {
    // setIsUploadWorkModalOpen(true);
    const {scrollY} = window;
    
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

  console.log(data)
  
  return (
    <VStack className="contest">
      <HeroSection bg={data.backgroundImage} owner={data.contestOwner} />

      <VStack className="contest__container">
        <DescriptionSection
          data={data}
          handleOpenWorkUploadModal={handleOpenWorkUploadModal}
        />

        {data.winners && <WinnersSection data = {data.winners}/>}

        <WorksListSection
          worksAmount={data.participantAmount}
        />

        <CommentsSection workId={id} contest />
      </VStack>

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
