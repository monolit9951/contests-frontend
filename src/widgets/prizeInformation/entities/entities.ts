export interface PrizeData {
    place: number;
    prize: {
        currency: string;
        prizeAmount: number;
        prizeText: string;
        prizeType: string;
    };
    winnersAmount: number;
}


export interface WinPlace extends PrizeData {
    winIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
}