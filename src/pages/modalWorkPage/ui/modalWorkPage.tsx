import { Work } from "entities/work";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "shared/lib/hooks/useAxios";
import { ModalWindow } from "shared/ui/modalWindow";
import { WorkPreview } from "widgets/worksSection/ui/workPreview/workPreview";

const ModalWorkPage: FC = () => {
    
    const navigate = useNavigate()
    const {contestId, workId} = useParams()

    const handlePageClose = () =>{
        if(contestId){
            navigate(`/contests/${contestId}`)
        } else {
            navigate(`/`)
        }
    }

    // сделано криво и данные выходит загружаются 2 раза - тут и в самой модалке
    const {data, isLoading} = useAxios<Work>(`works/${workId}`)

    return(
        <ModalWindow isOpen onClose={handlePageClose} >
            {!isLoading && data && <WorkPreview onClose={handlePageClose} work={data}/>}
        </ModalWindow>
    )
}

export default ModalWorkPage