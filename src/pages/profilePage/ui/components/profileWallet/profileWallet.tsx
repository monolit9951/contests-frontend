import { FC } from "react";
import './profileWallet.scss'
import profileWallet from 'shared/assets/icons/profileWallet.svg'


const ProfileWallet: FC = () =>{

    // ВОЗМОЖНО СДЕЛАТЬ ИСТОРИЮ БАЛАНСА В ВИДЕ ОТЛЕЛЬНЫХ КОМПОНЕНТОВ, ЕСЛИ ЛОГИКА БУДЕТ СЛОЖНЕЕ

    return(
        <div className="profileWallet">
            <div className="profileWallet_header">
                <div className="profileWallet_header_heading">Wallet</div>
                
                <img src={profileWallet} alt="wallet" />
            </div>

            <div className="profileWallet_currentBalanceGroup">
                <div className="profileWallet_currentBalanceGroup_balance">$ 12,450.75</div>
                <div className="profileWallet_currentBalanceGroup_desc">Current Balance</div>
            </div>

            <div className="profileWallet_balance_manipulation">
                <button>Deposit</button>
                <button>Withdraw</button>
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