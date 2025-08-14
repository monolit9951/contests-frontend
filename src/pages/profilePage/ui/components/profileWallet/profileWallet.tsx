import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PagedRequest } from "entities/request/model";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import Spinner from "shared/ui/spinner";

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";
import WalletBalance from "../walletBalance/walletBalance";
// import { PagedRequest } from "entities/request/intex";
// import profileWallet from 'shared/assets/icons/profileWallet.svg'
// import { useGetRequest } from "shared/lib/hooks/useGetRequest";
// import { Button } from "shared/ui/button";
// import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";
// import WalletBalance from "../walletBalance/walletBalance";
import WalletTrasaction from "../walletTransaction/walletTransaction";

import './profileWallet.scss'
import { Button } from "shared/ui/button";

interface Props {
    userId: string
}

export interface Transaction {
    amount: number,
    createdAt: number[],
    id: string,
    direction: string,
    type: string
    currencyType: "BONUS" | "MONEY"
}

// export interface WalletBalance {
//     balance: number,
//     bonusBalance: number,
//     updatedAt: string,
//     userId: string,
//     walletId: string
// }


const ProfileWallet: FC <Props>= ({userId}) =>{

    const [totalPages, setTotalPages] = useState<number>(0)
    const [nextPage, setNextPage] = useState<number>(1)

    // запрос на получение данных кошелька
    const {data: wallet, isLoaded: walletLoaded} = useGetRequest<any | string>({fetchFunc: () => fetchWalletBalance(userId), enabled: true, key: []})
    const {data: transactions, isLoaded: transactionsLoaded} = useGetRequest<PagedRequest<Transaction> | string>({fetchFunc: () => fetchWalletTransactions(userId, nextPage, 3), enabled: true, key: []})
    // if(typeof(wallet) === "string"){
    //     return <div>ERROR WALLET</div>
    // }

    const [pagedTransactions, setPagedTransactions] = useState<Transaction[] | []>([])

    useEffect(() => {
        if(transactionsLoaded && transactions && typeof(transactions) !== 'string'){
            setPagedTransactions(transactions.content)
            setTotalPages(transactions.totalPages)
        }

    }, [transactionsLoaded, transactions])

    const handleLoadMore = async() => {
        const response = await fetchWalletTransactions(userId, nextPage, 3)
        setPagedTransactions((prev) => [...prev, ...response.content]);
        setNextPage(nextPage + 1)
    }

    return(
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_heading">Wallet</div>

                <Link to='/transactions' className="profileWallet_seeMore">See more</Link>
            </div>


            <div className="profileWallet_balanceList">
                {walletLoaded &&
                <>
                    <WalletBalance type='COINS' value={wallet.balanceBonus}/>
                    <WalletBalance type='USD' value={wallet.balanceUsdt}/>
                </>}
                {
                    !walletLoaded && <Spinner center/>
                }
            </div>

            <div className="profileWallet_transactions">
                <div className="profileWallet_transactions_container">
                    {transactionsLoaded && pagedTransactions.map((item: Transaction, index: number) => (
                        <WalletTrasaction data={item} key={index}/>
                    ))}
                </div>
            </div>


            {nextPage !== totalPages && <div className="profileWallet_showMore">
                <Button type="button" variant="secondary" onClick={handleLoadMore}>More</Button>
            </div>}
        </div>
    )
}

export default ProfileWallet