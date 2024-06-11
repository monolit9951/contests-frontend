export type PrizeType = 'MONEY' | 'ITEM'

export type Currency = 'USD' | 'EUR' | 'PLN' | 'UAH'

export interface Prize {
    id: string
    prizeType: PrizeType
    currency: Currency
    prizeText: string
    prizeAmount: number
    place: number
    winnersAmount: number
}

export interface PrizePreview {
    id: string
    prizeType: PrizeType
    winnersAmount?: number
    currency?: Currency
    prizeAmount?: number
}
