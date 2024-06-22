import { createSlice } from '@reduxjs/toolkit'

import {
    setContestBackgroundImage,
    setContestCategory,
    setContestDateEnd,
    setContestDateStart,
    setContestDescription,
    setContestExampleMedia,
    setContestMaxAllowedParticipantAmount,
    setContestName,
    setContestOpen,
    setContestParticipantAmount,
    setContestPreivewImage,
    setContestStatus,
    setContestSubcategory,
    setSelectionType,
} from '../services/dataSetters'


interface Prize {
    id: string;
    place: number;
    currency: string;
    prizeAmount: number;
    prizeText: string;
    prizeType: string;
    winnersAmount: number;
}

interface ContestCreationState {
    id: string;
    name: string;
    status: string;
    category: string;
    subcategory: string;
    backgroundImage: string | undefined;
    previewImage: string | undefined;
    participantAmount: number;
    maxAllowedParticipantAmount: number;
    selectionType: string;
    dateStart: string;
    dateEnd: string;
    description: string;
    exampleMedia: string[];
    prizes: Prize[];
    popularity: number;
    contestOwnerId: string;
    contestOpen: boolean;
}

const initialState: ContestCreationState  = {
    id: '',
    name: '',
    status: 'INACTIVE',
    category: 'FOR_FUN',
    subcategory: 'SUBCATEGORY1',
    backgroundImage: '',
    previewImage: '',
    participantAmount: 0,
    maxAllowedParticipantAmount: 0,
    selectionType: "RANDOM",
    dateStart: '',
    dateEnd: '',
    description: '',
    exampleMedia: [],
    prizes: [
        {
            id: '',
            place: 1,
            currency: 'EUR',
            prizeAmount: 0,
            prizeText: '',
            prizeType: 'MONEY',
            winnersAmount: 0,
        },
        {
            id: '',
            place: 2,
            currency: 'EUR',
            prizeAmount: 0,
            prizeText: '',
            prizeType: 'MONEY',
            winnersAmount: 0,
        },
        {
            id: '',
            place: 3,
            currency: 'EUR',
            prizeAmount: 0,
            prizeText: '',
            prizeType: 'MONEY',
            winnersAmount: 0,
        },
        {
            id: '',
            place: 4,
            currency: 'EUR',
            prizeAmount: 0,
            prizeText: '',
            prizeType: 'MONEY',
            winnersAmount: 0,
        },
    ],
    popularity: 0,
    // topWinners: [
    //     {}
    // ],
    contestOwnerId: "",
    contestOpen: true
}

const slice = createSlice({
    name: 'contestsCreationPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setContestName.fulfilled, (state, action) => {
                state.name = action.payload
            })
            .addCase(setSelectionType.fulfilled, (state, action) => {
                state.selectionType = action.payload;
            })
            .addCase(setContestDescription.fulfilled, (state, action) => {
                state.description = action.payload
            })
            .addCase(setContestStatus.fulfilled, (state, action) => {
                state.status = action.payload
            })
            .addCase(setContestCategory.fulfilled, (state, action) => {
                state.category = action.payload
            })
            .addCase(setContestSubcategory.fulfilled, (state, action) => {
                state.subcategory = action.payload
            })
            .addCase(setContestBackgroundImage.fulfilled, (state, action) => {
                state.backgroundImage = action.payload
            })
            .addCase(setContestPreivewImage.fulfilled, (state, action) => {
                state.previewImage = action.payload
            })
            .addCase(setContestParticipantAmount.fulfilled, (state, action) => {
                state.participantAmount = action.payload
            })
            .addCase(
                setContestMaxAllowedParticipantAmount.fulfilled,
                (state, action) => {
                    state.maxAllowedParticipantAmount = action.payload
                }
            )
            .addCase(setContestDateStart.fulfilled, (state, action) => {
                state.dateStart = action.payload
            })
            .addCase(setContestDateEnd.fulfilled, (state, action) => {
                state.dateEnd = action.payload
            })
            .addCase(setContestExampleMedia.fulfilled, (state, action) => {
                state.exampleMedia = action.payload
            })
            .addCase(setContestOpen.fulfilled, (state, action) => {
                state.contestOpen = action.payload;
            })
            
    },
})

export const {
    reducer: contestsCreationPageReducer,
    actions: contestsCreationPageActions,
} = slice
