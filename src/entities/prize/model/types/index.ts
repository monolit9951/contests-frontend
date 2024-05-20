export type PrizeType = 'MONEY' | 'ITEM'

export type Currency = 'USD' | 'EUR' | 'PLN' | 'UAH'

export interface Prize {
    id: string
    prizeType: PrizeType
    currency: Currency
    prizeText: string
    prizeAmount: number
}

export interface PrizePreview {
    id: string
    prizeType: PrizeType
    prizeText: string
    prizeAmount: number
}

export interface PrizeStructure {
    id: string
    place: number
    winnersAmount: number
    prize: Prize
}
