import { FC } from "react";
import profileWallet from 'shared/assets/icons/profileWallet.svg'
import { useGetRequest } from "shared/lib/hooks/useGetRequest";

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";

import './profileWallet.scss'
import WalletTrasaction from "../walletTransaction/walletTransaction";

interface Props {
    userId: string
}

export interface Transaction {
    amount: number,
    createdAt: number[],
    id: string,
    directiom: string,
    type: string
}

export interface WalletBalance {
    balance: number,
    bonusBalance: number,
    updatedAt: string,
    userId: string,
    walletId: string
}


const ProfileWallet: FC <Props>= ({userId}) =>{

    // запрос на получение данных кошелька
    const {data: wallet, isLoaded: walletLoaded} = useGetRequest<WalletBalance | string>({fetchFunc: () => fetchWalletBalance(userId), enabled: true, key: []})
    const {data: transactions, isLoaded: transactionsLoaded} = useGetRequest<Transaction[] | string>({fetchFunc: () => fetchWalletTransactions(userId), enabled: true, key: []})

    return(
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_header_heading">Wallet</div>
                
                <img src={profileWallet} alt="wallet" />
            </div>

            <div className="profileWallet_currentBalanceGroup">
                {walletLoaded && wallet && <div className="profileWallet_currentBalanceGroup_balance">$ {wallet.balance? wallet.balance : 0}</div>}
                <div className="profileWallet_currentBalanceGroup_desc">Current Balance</div>
            </div>

            <div className="profileWallet_balance_manipulation">
                <button type="button">Deposit</button>
                <button type="button">Withdraw</button>
            </div>

            <div className="profileWallet_balance_history">
                {
                    transactionsLoaded && transactions.content && transactions.content.map((data: Transaction, index: number) => (
                        <WalletTrasaction transaction = {data} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ProfileWallet