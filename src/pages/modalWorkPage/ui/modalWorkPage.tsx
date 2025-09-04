import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Work } from "entities/work";
import useAxios from "shared/lib/hooks/useAxios";
import { ModalWindow } from "shared/ui/modalWindow";
import { WorkPreview } from "widgets/worksSection/ui/workPreview/workPreview";

const ModalWorkPage: FC = () => {
    
    const navigate = useNavigate()
    const {contestId, workId} = useParams()

    const handlePageClose = () =>{
        if(contestId){
            navigate(`/contests/${contestId}`, {state: {refreshWork: true, workId}})
        } else {
            navigate(`/`)
        }
    }

    // сделано криво и данные выходит загружаются 2 раза - тут и в самой модалке
    const {data, isLoading} = useAxios<Work>(`works/${workId}`)

    return(
        <>
            <Helmet>
                <title>DareBay | Work | {!isLoading && data? data.description : 'Loading...'}</title>
                <meta property="og:title" content={!isLoading && data? data.description : 'Loading...'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content={!isLoading && data? data.description?.slice(0, 160) : 'DareBay participant work'} />
                <meta property="og:description" content={!isLoading && data? data.description?.slice(0, 160) : 'DareBay participant work'} />
            </Helmet>

            <ModalWindow isOpen onClose={handlePageClose} >
                {!isLoading && data && 
                    <WorkPreview 
                        // onClose={handlePageClose} 
                        workId={data.id}
                    />}
            </ModalWindow>
        </>
    )
}

export default ModalWorkPage