import { FC } from "react";
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

    // запрос на получение данных кошелька
    const {data: wallet, isLoaded: walletLoaded} = useGetRequest<any | string>({fetchFunc: () => fetchWalletBalance(userId), enabled: true, key: []})
    const {data: transactions, isLoaded: transactionsLoaded} = useGetRequest<PagedRequest<Transaction> | string>({fetchFunc: () => fetchWalletTransactions(userId), enabled: true, key: []})

    // if(typeof(wallet) === "string"){
    //     return <div>ERROR WALLET</div>
    // }


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
                {transactionsLoaded && typeof(transactions) !== 'string' && transactions?.content.map((item: Transaction, index: number) => (
                    <WalletTrasaction data={item} key={index}/>
                ))}
                
            </div>
        </div>
    )
}

export default ProfileWallet