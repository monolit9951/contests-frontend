export type PrizeType = 'MONEY' | 'COINS'

export type Currency = 'USD' | 'EUR' | 'PLN' | 'UAH'

export interface Prize {
    id: string
    prizeType: PrizeType
    currency: Currency | null
    prizeText: string
    prizeAmount: number
    place: number
    winnersAmount: number
}

export interface PrizePreview {
    id: string
    prizeType: PrizeType
    winnersAmount: number
    currency: Currency | null
    prizeText: string
    prizeAmount: number
}
