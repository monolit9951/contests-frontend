import { FC, useEffect, useRef, useState } from "react";
import { Contest } from "entities/contest";
import { Prize } from "entities/prize";
import { Work } from "entities/work";
import instance from "shared/api/api";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { Button } from "shared/ui/button";

import { getPossibleWinners, getRuledWorks } from "../../model/services/contestService";
import WinnerSelectors from "../winnersSelectors/winnerSelectors";
import WinnerWork from "../winnerWork/winnerWork";

import './ownerDecisionPanel.scss'

interface Props {
    contest: Contest
}



const OwnerDecisionPanel: FC<Props> = ({ contest }) => {
    const [works, setWorks] = useState<Work[]>([])
    const [winners, setWinners] = useState<Work[]>([])
    const [currentFilter, setCurrentFilter] = useState<string>('allWorks')
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const { showAlert, Alert } = useAlert()
    const observerRef = useRef<HTMLDivElement | null>(null)

    const options = contest.prizes.map((prize: Prize) => ({
        label: `Place №${prize.place}`,
        value: prize.id,
    }))

    const fetchWorks = async (page: number) => {
        const data = await getRuledWorks(contest.id, page, 6)
        if (data.content?.length) {
            setWorks(prev => [...prev, ...data.content])
        } else {
            setHasMore(false)
        }
    }

    const fetchWinners = async (page: number) => {
        const data = await getPossibleWinners(contest.id, page, 6)
        if (data?.length) {
        setWinners(prev => [...prev, ...data])
        } else {
        setHasMore(false)
        }
    }

    const loadMore = () => {
        setCurrentPage(prev => prev + 1)
    }

    useEffect(() => {
        if (!hasMore) return
        if (currentFilter === 'allWorks') fetchWorks(currentPage)
        else fetchWinners(currentPage)
    }, [currentPage, currentFilter])

    const chooseSelectorCallback = (key: string) => {
        setCurrentFilter(key)
        setCurrentPage(0)
        setHasMore(true)
        if (key === 'allWorks') setWorks([])
        else setWinners([])
    }

    useEffect(() => {
        if (!observerRef.current) return () => {}

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                if (entry.isIntersecting && hasMore) loadMore()
                })
            },
            { threshold: 1.0 }
        )

        observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [hasMore])

    const handleFinalSubmit = async () => {
        try {
            const token = localStorage.getItem('userToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await instance.post(`/winners/confirm/${contest.id}`, null, { headers })
            showAlert('SUCCESS', 'WINNERS CONFIRMED')
        } catch (error) {
            showAlert('ERROR', 'CANNOT CONFIRM WINNERS')
        }
    }

    return (
        <div className="ownerDecosonPanel">
            <div className="chooseWinnerPage_selectors">
                <WinnerSelectors chooseSelectorCallback={chooseSelectorCallback} />
            </div>

            <div className="winnersList">
                {currentFilter === 'allWorks' &&
                works.map((data: Work, index: number) => (
                    <WinnerWork work={data} key={index} options={options} />
                ))}
                {currentFilter === 'winWorks' &&
                winners.map((data: Work, index: number) => (
                    <WinnerWork work={data} key={index} options={options} />
                ))}

                {currentFilter === 'winWorks' && (
                <div className="chooseWinnerPage_paginationBtn">
                    <Button type="button" variant="primary" onClick={handleFinalSubmit}>
                    Final Submit
                    </Button>
                </div>
                )}
            </div>

            <div className="ownerDecosonPanel_observer" ref={observerRef} />

            <Alert />
        </div>
    )
}

export default OwnerDecisionPanel