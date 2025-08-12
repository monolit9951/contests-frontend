import { FC } from "react";
import { PagedRequest } from "entities/request/intex";
import profileWallet from 'shared/assets/icons/profileWallet.svg'
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";
import WalletTrasaction from "../walletTransaction/walletTransaction";

import './profileWallet.scss'
import { Link } from "react-router-dom";
import WalletBalance from "../walletBalance/walletBalance";

interface Props {
    userId: string
}

export interface Transaction {
    amount: number,
    createdAt: number[],
    id: string,
    direction: string,
    type: string
}

export interface WalletBalance {
    balance: number,
    bonusBalance: number,
    updatedAt: string,
    userId: string,
    walletId: string
}

// тестовые данные
const transaction = {
    amount: 1000,
    createdAr: [10, 10, 10, 10, 10],
    id: '1',
    direction: 'dadada',
    type: 'dddd'
}

const ProfileWallet: FC <Props>= ({userId}) =>{

    // запрос на получение данных кошелька
    const {data: wallet, isLoaded: walletLoaded} = useGetRequest<WalletBalance | string>({fetchFunc: () => fetchWalletBalance(userId), enabled: true, key: []})
    const {data: transactions, isLoaded: transactionsLoaded} = useGetRequest<PagedRequest<Transaction> | string>({fetchFunc: () => fetchWalletTransactions(userId), enabled: true, key: []})

    // if(typeof(wallet) === "string"){
    //     return <div>ERROR WALLET</div>
    // }

    const transactionsList = (transactions && typeof transactions !== 'string') ? transactions.content : [];
    
    return(
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_heading">Wallet</div>

                <Link to='/transactions' className="profileWallet_seeMore">See more</Link>
            </div>


            <div className="profileWallet_balanceList">
                <WalletBalance type='COINS'/>
                <WalletBalance type='USD' />
            </div>

            <div className="profileWallet_transactions">
                <WalletTrasaction />
                <WalletTrasaction />
                <WalletTrasaction />
                <WalletTrasaction />
                <WalletTrasaction />
            </div>
        </div>
    )
}

export default ProfileWallet