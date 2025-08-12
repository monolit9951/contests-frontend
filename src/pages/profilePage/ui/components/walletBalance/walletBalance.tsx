import { FC } from "react";
import dollars from 'shared/assets/icons/bigDollar.svg'
import coins from 'shared/assets/icons/Coins.svg'
import { Button } from "shared/ui/button";
import { SparklineChart } from "widgets/sparklineChart";

import './walletBalance.scss'

interface Props {
    type: 'COINS' | 'USD'
}

// тестовые данные, потом поменять
const dataCoins = [-2, -5, 0, 20, 8, 15];
const dataUSD = [10, -20, 10, 2, 0, 2, 4, 6, 1];


const WalletBalance: FC<Props> = ({type}) => {
    return(
        <div className="walletBalance">
            <div className="walletBalance_header">
                <div className="walletBalance_header_currency">
                    <img src={type === 'COINS'? coins: dollars} alt="currency" />
                </div>

                <div className="walletBalance_header_heading">Balance {type === 'COINS'? 'Coin' : 'USDT'}</div>

                <div className="walletBalance_header_difference">+99.9%</div>
            </div>

            <div className="walletBalance_balance">12,450.75</div>

            <div className="walletBalance_graph">
                <SparklineChart data={type === 'COINS'? dataCoins : dataUSD}/>
            </div>

            <div className="walletBalance_button">
                <Button type="button" variant="primary">Deposit</Button>
            </div>
        </div>
    )
}

export default WalletBalance