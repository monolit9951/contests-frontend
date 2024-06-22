export interface PrizeData {
    // id: string;
    place: number;
    prize: {
        // id: string;
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