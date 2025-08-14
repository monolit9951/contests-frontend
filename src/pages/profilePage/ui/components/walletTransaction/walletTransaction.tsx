import { FC } from 'react'
import minus from 'shared/assets/icons/minusSmall.svg'
import  plus from'shared/assets/icons/plusSmall.svg'

import { Transaction } from '../profileWallet/profileWallet'

import './walletTransaction.scss'
import moment from 'moment'

interface Props {
    data: Transaction
}

const WalletTrasaction: FC<Props> = ({data}) => {

    const date = moment.utc([
        data.createdAt[0],
        data.createdAt[1] - 1,
        data.createdAt[2],
        data.createdAt[3],
        data.createdAt[4],
        data.createdAt[5],
        Math.floor(data.createdAt[6] / 1000000)
    ]);

    const createDate = moment.utc(date).local().format("YYYY/MM/DD")

    return(
        <div className="profileWallet_transaction">
            <div className="profileWallet_transaction_left">
                <div className={true? "profileWallet_transaction_status" : 'profileWallet_transaction_status minus'}>
                    <img src={true? plus : minus} alt="status" />
                </div>

                <div className="profileWallet_transaction_info">
                    <div className="profileWallet_transaction_info_action">{data.direction}</div>
                    <div className="profileWallet_transaction_info_date">{createDate}</div>
                </div>
            </div>

            <div className="profileWallet_transaction_right">{true? '+' : '-'}{data.amount}{data.currencyType ==='BONUS'? 'c' : '$'}</div>
        </div>
    )
}

export default WalletTrasaction