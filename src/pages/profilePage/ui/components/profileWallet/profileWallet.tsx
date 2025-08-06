import { FC } from "react";
import profileWallet from 'shared/assets/icons/profileWallet.svg'
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";
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
}

export interface WalletBalance {
    balance: number,
    bonusBalance: number,
    updatedAt: string,
    userId: string,
    walletId: string
}

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
                <Button type="button" variant="primary">Deposit</Button>
                <Button type="button" variant="primary">Withdraw</Button>
            </div>

            <div className="profileWallet_balance_history">
                {
                    transactionsLoaded && transactions?.content?.map((data: Transaction, index: number) => (
                        <WalletTrasaction transaction = {data} key={index}/>
                    ))
                }
                <WalletTrasaction transaction = {transaction}/>
            </div>
        </div>
    )
}

export default ProfileWallet