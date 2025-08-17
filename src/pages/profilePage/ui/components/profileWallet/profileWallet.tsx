import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PagedRequest } from "entities/request/model"
import { useGetRequest } from "shared/lib/hooks/useGetRequest"
import Spinner from "shared/ui/spinner"

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices"
import WalletBalance from "../walletBalance/walletBalance"
import WalletTrasaction from "../walletTransaction/walletTransaction"

import "./profileWallet.scss"

interface Props {
    userId: string
}

export interface Transaction {
    amount: number
    createdAt: number[]
    id: string
    direction: string
    type: string
    currencyType: "BONUS" | "MONEY"
}

const ProfileWallet: FC<Props> = ({ userId }) => {
    const [totalPages, setTotalPages] = useState<number>(0)
    const [nextPage, setNextPage] = useState<number>(1)
    const [pagedTransactions, setPagedTransactions] = useState<Transaction[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const { data: wallet, isLoaded: walletLoaded } = useGetRequest<any | string>({
        fetchFunc: () => fetchWalletBalance(userId),
        enabled: true,
        key: [],
    });

    const { data: transactions, isLoaded: transactionsLoaded } = useGetRequest<PagedRequest<Transaction> | string>({
        fetchFunc: () => fetchWalletTransactions(userId, 0, 3),
        enabled: true,
        key: [],
    });

    useEffect(() => {
        if (transactionsLoaded && transactions && typeof transactions !== "string") {
            setPagedTransactions(transactions.content);
            setTotalPages(transactions.totalPages);
        }
    }, [transactionsLoaded, transactions]);

    const handleLoadMore = async () => {
        if (isLoadingMore || nextPage >= totalPages) return;
        setIsLoadingMore(true);

        const response = await fetchWalletTransactions(userId, nextPage, 3);
        if (response && typeof response !== "string") {
            setPagedTransactions((prev) => [...prev, ...response.content]);
            setNextPage((prev) => prev + 1);
        }

        setIsLoadingMore(false);
    };

    // пагинация при скролле  
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;

        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 10) {
            handleLoadMore();
        }
    };


    return (
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_heading">Wallet</div>
                <Link to="/transactions" className="profileWallet_seeMore">
                See more
                </Link>
            </div>

            <div className="profileWallet_balanceList">
                {walletLoaded ? (
                    <>
                        <WalletBalance type="COINS" value={wallet.balanceBonus} />
                        <WalletBalance type="USD" value={wallet.balanceUsdt} />
                    </>
                ) : (
                    <Spinner center />
                )}
            </div>

            <div className="profileWallet_transactions">
                <div
                className="profileWallet_transactions_container"
                onScroll={handleScroll}>
                    
                {transactionsLoaded &&
                pagedTransactions.map((item: Transaction, index: number) => (
                    <WalletTrasaction data={item} key={item.id ?? index} />
                ))}

                {isLoadingMore && <Spinner center />}
                </div>
            </div>
        </div>
    );
};

export default ProfileWallet;
