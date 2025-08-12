import { FC } from 'react'
import minus from 'shared/assets/icons/minusSmall.svg'
import  plus from'shared/assets/icons/plusSmall.svg'

import './walletTransaction.scss'



const WalletTrasaction: FC = () => {

    // const transactionDate = `${transaction.createdAt[0]}/${transaction.createdAt[1]}/${transaction.createdAt[2]} `

    return(
        <div className="profileWallet_transaction">
            <div className="profileWallet_transaction_left">
                <div className={true? "profileWallet_transaction_status" : 'profileWallet_transaction_status minus'}>
                    <img src={true? plus : minus} alt="status" />
                </div>

                <div className="profileWallet_transaction_info">
                    <div className="profileWallet_transaction_info_action">Gay strip club pay</div>
                    <div className="profileWallet_transaction_info_date">11/09/2001</div>
                </div>
            </div>

            <div className="profileWallet_transaction_right">{true? '+' : '-'}$500</div>
        </div>
    )
}

export default WalletTrasaction