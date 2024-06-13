import {User} from "entities/user";

export interface Media {
    id: string;
    ownerId: string;
    mediaLink: string;
}

type WorkType = 'TEXT' | 'IMAGE' | 'VIDEO'

export interface Work {
    id: string
    ownerId: string
    description: string
    media: Media[] | null
    likeAmount: number
    commentAmount: number
    user: User
    typeWork: WorkType | string
    popularity: number
}

export interface WorksResponse {
    content: Work[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}