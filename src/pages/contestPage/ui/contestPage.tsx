import { Helmet } from "react-helmet-async";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Contest } from 'entities/contest';
import useAxios from 'shared/lib/hooks/useAxios';
import { Button } from 'shared/ui/button';
import Spinner from 'shared/ui/spinner';
import { VStack } from 'shared/ui/stack';
import { Text } from 'shared/ui/text';
import { CommentsSection } from 'widgets/commentsSection';

import DescriptionSection from './components/descriptionSection/descriptionSection';
import HeroSection from './components/heroSection/heroSection';
import WinnersSection from './components/winnersSection/winnersSection';
// import WinnersSection from './components/winnersSection/winnersSection';
import WorksListSection from './components/worksListSection/worksListSection';

import './contestPage.scss';

const ContestPage = () => {
  const { contestId: id } = useParams<{ contestId: string }>();
  const navigate = useNavigate();


  const { data, isLoading, error } = useAxios<Contest>(`contests/${id}`);
  
  return (
    <>
      {!data && !isLoading && <div className="contest__error-message">
        <Text Tag="p" bold size="xl">
          Request error{`: ${error?.message}`}
        </Text>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>}

      {isLoading && <Spinner center />}

      {!id && <div className="contest__error-message">
        <Text Tag="p" bold size="xl">
          Something went wrong
        </Text>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>}


      {data && <VStack className="contest">

        <Helmet>
            <title>DareBay | {!isLoading? data.name : 'Loading...'}</title>
            <meta property="og:title" content={!isLoading? data.name : 'Contest page'} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta name="description"  content={!isLoading? data.description?.slice(0, 160) : 'DareBay Contest'} />
            <meta property="og:description" content={!isLoading? data.description?.slice(0, 160) : 'DareBay Contest'} />
        </Helmet>

        <HeroSection bg={data.backgroundImage} owner={data.contestOwner} contestId = {data.id}/>

        <VStack className="contest__container">
          <DescriptionSection
            data={data}
            // handleOpenWorkUploadModal={handleOpenWorkUploadModal}
          />

          {data.winners && data.winners.length > 0 && <WinnersSection winners = {data.winners.slice(0, 3)}/>}

          <WorksListSection />

          {id && <CommentsSection workId={id} contest />}
        </VStack>

        <Outlet />
      </VStack>}
    </>
  );
};

export default ContestPage;
