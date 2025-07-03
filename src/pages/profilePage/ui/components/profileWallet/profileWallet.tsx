import { FC } from "react";
import profileWallet from 'shared/assets/icons/profileWallet.svg'
import useAxios from "shared/lib/hooks/useAxios";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";

import { fetchWalletBalance, fetchWalletTransactions } from "../../model/sevices/walletServices";

import './profileWallet.scss'

interface ProfileWalletInterface {
    userId: string
}

const ProfileWallet: FC <ProfileWalletInterface>= ({userId}) =>{

    // ВОЗМОЖНО СДЕЛАТЬ ИСТОРИЮ БАЛАНСА В ВИДЕ ОТЛЕЛЬНЫХ КОМПОНЕНТОВ, ЕСЛИ ЛОГИКА БУДЕТ СЛОЖНЕЕ

    // const { data, isLoading, error } = useAxios<any>(`users/${userId}`)

    // запрос на получение данных кошелька
    const {data: wallet, isLoaded: walletLoaded} = useGetRequest({fetchFunc: () => fetchWalletBalance(userId), enabled: true, key: []})

    // запрос на получение транзакций кошелька
    const {data: transactions, isLoaded: transactionsLoaded} = useGetRequest({fetchFunc: () => fetchWalletTransactions(userId), enabled: true, key: []})

    return(
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_header_heading">Wallet</div>
                
                <img src={profileWallet} alt="wallet" />
            </div>

            <div className="profileWallet_currentBalanceGroup">
                {walletLoaded && wallet && <div className="profileWallet_currentBalanceGroup_balance">$ {wallet.balance}</div>}
                <div className="profileWallet_currentBalanceGroup_desc">Current Balance</div>
            </div>

            <div className="profileWallet_balance_manipulation">
                <button type="button">Deposit</button>
                <button type="button">Withdraw</button>
            </div>

            <div className="profileWallet_balance_history">
                
                <div className="profileWallet_balance_action">
                    <div className="profileWallet_balance_action_left">
                        <div className="profileWallet_balance_action_type">+</div>

                        <div className="profileWallet_balance_action_info">
                            <div className="profileWallet_balance_action_info_name">Contest Prize</div>
                            <div className="profileWallet_balance_action_info_desc">2024-01-15</div>
                        </div>
                    </div>

                    <div className="profileWallet_balance_action_right">+$500</div>
                </div>

                <div className="profileWallet_balance_action">
                    <div className="profileWallet_balance_action_left">
                        <div className="profileWallet_balance_action_type">+</div>

                        <div className="profileWallet_balance_action_info">
                            <div className="profileWallet_balance_action_info_name">Contest Prize</div>
                            <div className="profileWallet_balance_action_info_desc">2024-01-15</div>
                        </div>
                    </div>

                    <div className="profileWallet_balance_action_right">+$500</div>
                </div>

            </div>
        </div>
    )
}

export default ProfileWallet