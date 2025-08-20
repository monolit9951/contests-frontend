import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Contest } from 'entities/contest';
import useAxios from 'shared/lib/hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { Button } from 'shared/ui/button';
import Spinner from 'shared/ui/spinner';
import { VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';
import { CommentsSection } from 'widgets/commentsSection';

import { selectContestMedia, selectContestOwnerId } from '../model/selectors';
import { fetchMediaWorks } from '../model/services';
import { contestWorksActions } from '../model/slice';

import DescriptionSection from './components/descriptionSection/descriptionSection';
import HeroSection from './components/heroSection/heroSection';
import WinnersSection from './components/winnersSection/winnersSection';
// import WinnersSection from './components/winnersSection/winnersSection';
import WorksListSection from './components/worksListSection/worksListSection';

import './contestPage.scss';

const ContestPage = () => {
  const { contestId: id } = useParams<{ contestId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  // для модалок

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

  useEffect(() => {
    if (!location.pathname.includes("/work/")) {
      const savedScroll = sessionStorage.getItem("contestScroll");
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }
    }
  }, [location]);

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

  
  return (
    <VStack className="contest">
      <HeroSection bg={data.backgroundImage} owner={data.contestOwner} contestId = {data.id}/>

      <VStack className="contest__container">
        <DescriptionSection
          data={data}
        />

        {data.winners && data.winners.length > 0 && <WinnersSection winners = {data.winners.slice(0, 3)}/>}

        <WorksListSection worksAmount={data.participantAmount}/>
        <CommentsSection workId={id} contest />
      </VStack>

      <Outlet />
    </VStack>
  );
};

export default ContestPage;
