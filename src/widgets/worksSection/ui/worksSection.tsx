import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Work } from 'entities/work';
import WorkComponent from 'entities/work/ui/workComponent';
import { fetchWorks, incrementPage } from 'pages/feedPage/model/slice';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { ModalWindow } from 'shared/ui/modalWindow';
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview';

import './worksSection.scss';

const WorksSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);

    const dispatch = useAppDispatch();

    const works = useAppSelector((state: RootState) => state.works.works);
    const loading = useAppSelector((state: RootState) => state.works.loading);
    const error = useAppSelector((state: RootState) => state.works.error);
    const page = useAppSelector((state: RootState) => state.works.page);
    const hasMore = useAppSelector((state: RootState) => state.works.hasMore);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastWorkElementRef = useCallback((node: any) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(incrementPage());
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        dispatch(fetchWorks(page));
    }, [dispatch, page]);

    const openModal = (work: Work) => {
        setSelectedWork(work);
        setIsModalOpen(true);
    };

    if (loading && !works.length) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const getModalWidth = (work: Work | null): string => {
        if (work?.typeWork === 'VIDEO' || work?.typeWork === 'IMAGE') {
            return '1180px';
        }
        return '520px';
    };

    return (
        <div className="works-section">
            {works.map((work: any, index: number) => (
                <div
                    key={work.id}
                    ref={works.length === index + 1 ? lastWorkElementRef : null}
                    className="works-section__content"
                >
                    <WorkComponent work={work} openModal={openModal} />
                </div>
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
            {loading && <p>Loading more works...</p>}
        </div>
    );
};

export default WorksSection;
