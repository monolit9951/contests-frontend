import React, {useEffect, useState} from 'react';
import {Work} from "entities/work";
import WorkComponent from "entities/work/ui/workComponent";
import { fetchWorks } from "pages/feedPage/model/slice";
import {useAppDispatch, useAppSelector} from "shared/lib/store";
import {ModalWindow} from "shared/ui/modalWindow";
import {WorkPreview} from "widgets/worksSection/ui/workPreview/workPreview";

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);  // State for selected work

    const dispatch = useAppDispatch();
    const works = useAppSelector((state: RootState) => state.works.works);
    const loading = useAppSelector((state: RootState) => state.works.loading);
    const error = useAppSelector((state: RootState) => state.works.error);

    useEffect(() => {
        dispatch(fetchWorks(1));
    }, [dispatch]);

    const openModal = (work: Work) => {
        setSelectedWork(work);
        setIsModalOpen(true);
    };
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}11</p>;
    }
    const getModalWidth = (work: Work | null): string => {
        if (work?.typeWork === "VIDEO" || work?.typeWork === "IMAGE") {
            return '1180px';
        }
        return '520px';
    };
    console.log(works, 'works')
    return (
        <div className="works-section">
            {works.map((work: any) => (
                <WorkComponent key={work.id} work={work} openModal={openModal} />
            ))}
            <ModalWindow
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isOuterClose
                width={getModalWidth(selectedWork)}
                height='900px'
            >
                {selectedWork && <WorkPreview work={selectedWork} />}
            </ModalWindow>
        </div>
    );
};

export default WorksSection;
