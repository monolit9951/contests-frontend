import React, { useEffect } from 'react';
import WorkComponent from "entities/work/ui/workComponent";
import { fetchWorks } from "pages/feedPage/model/slice";
import {useAppDispatch, useAppSelector} from "shared/lib/store";

const WorksSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const works = useAppSelector((state: RootState) => state.works.works);
    const loading = useAppSelector((state: RootState) => state.works.loading);
    const error = useAppSelector((state: RootState) => state.works.error);

    useEffect(() => {
        dispatch(fetchWorks(1));
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="works-section">
            {works.map((work: any) => (
                <WorkComponent key={work.id} work={work} />
            ))}
        </div>
    );
};

export default WorksSection;
