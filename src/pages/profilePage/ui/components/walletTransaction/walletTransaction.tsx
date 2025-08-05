import { FC } from 'react'

import './walletTransaction.scss'

interface Props {
    transaction: any
}

const WalletTrasaction: FC<Props> = ({transaction}) => {

    // const transactionDate = `${transaction.createdAt[0]}/${transaction.createdAt[1]}/${transaction.createdAt[2]} `
    const transactionDate = '2/2/2'

    return(
        <div className="profileWallet_balance_action">
            <div className="profileWallet_balance_action_left">
                <div className="profileWallet_balance_action_type">+</div>

                <div className="profileWallet_balance_action_info">
                    <div className="profileWallet_balance_action_info_name">{transaction.direction}</div>
                    <div className="profileWallet_balance_action_info_desc">{transactionDate}</div>
                </div>
            </div>

            <div className="profileWallet_balance_action_right">+${transaction.amount}</div>
        </div>
    )
}

export default WalletTrasaction