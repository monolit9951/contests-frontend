import { FC, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Contest } from "entities/contest";
import { PagedRequest } from "entities/request/intex";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import { fetchProfileContests } from "../../model/sevices/contestServices";
import ProfileContestsContest from "../profileContestsContest/profileContestsContest";

import "./profileContests.scss";

interface ProfileContestsInterface {
    userId: string;
}

const ProfileContests: FC<ProfileContestsInterface> = ({ userId }) => {
    const [extraPath, setExtraPath] = useState<string>("user-all");
    const [listPage, setListPage] = useState<number>(0);

    // локальный стейт для всего списка
    const [allContests, setAllContests] = useState<Contest[]>([]);

    const { data: contests, isLoaded: contestsLoaded } = useGetRequest<PagedRequest<Contest> | string>({
        fetchFunc: () => fetchProfileContests(extraPath, userId, 0, 3),
        enabled: true,
        key: [extraPath, userId]
    });

    const [contestType, setContestType] = useState<string>("All");

    // при первой загрузке пишем в локальный стейт
    useEffect(() => {
        if (contests && typeof contests !== "string") {
            setAllContests(contests.content);
            setListPage(0);
        }
    }, [contests]);

    // смена вкладки
    const handleSwitchType = (type: string, path: string) => {
        setContestType(type);
        setExtraPath(path);
    };

    // загрузка ещё
    const handleMore = async () => {
        const nextPage = listPage + 1;
        const res = await fetchProfileContests(extraPath, userId, nextPage, 3);
        if (typeof res !== "string") {
            setAllContests(prev => [...prev, ...res.content]);
            setListPage(nextPage);
        }
    };

    if (typeof contests === "string") {
        return <div>Error: {contests}</div>;
    }

    return (
        <div className="profileContests">
            <div className="profileContests_header">
                <div className="profileContests_header_heading">
                    <span>Contests</span>
                    <Link to="/">See more</Link>
                </div>
            </div>

            <ul className="profileContests_switch">
                <li>
                    <button
                        onClick={() => handleSwitchType("All", "user-all")}
                        type="button"
                        className={contestType === "All" ? "switched" : ""}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleSwitchType("Participating", "user-participant")
                        }
                        type="button"
                        className={contestType === "Participating" ? "switched" : ""}
                    >
                        Participating
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleSwitchType("Winning", "user-winner")}
                        type="button"
                        className={contestType === "Winning" ? "switched" : ""}
                    >
                        Winning
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleSwitchType("Organizing", "user-owned")}
                        type="button"
                        className={contestType === "Organizing" ? "switched" : ""}
                    >
                        Organizing
                    </button>
                </li>
            </ul>

            <div className="profileContests_contestsList">
                <div className="profileContests_contestsList_container">
                    {contestsLoaded && allContests.length > 0 &&
                        allContests.map((data: Contest, index: number) => (
                            <ProfileContestsContest key={index} data={data} />
                        ))
                    }

                    {contestsLoaded && allContests.length === 0 && (
                        <div className="profileContests_contestsList_empty">
                            List is empty
                        </div>
                    )}
                </div>
            </div>

            <div className="profileContests_showMore">
                <Button variant="secondary" type="button" onClick={handleMore} disabled = {!(contestsLoaded && contests && contests.totalPages - 1 !== listPage && contests.totalPages !== 0)}>
                    More
                </Button>
            </div>
        </div>
    );
};

export default ProfileContests;
