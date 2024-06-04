import { createSlice } from '@reduxjs/toolkit';
import { Contest } from 'entities/contest';

import {
    setContestBackgroundImage,
    setContestCategory,
    setContestDateEnd,
    setContestDateStart,
    setContestDescription,
    setContestExampleMedia,
    setContestMaxAllowedParticipantAmount,
    setContestName,
    setContestOwner,
    setContestParticipantAmount,
    setContestPrizeStructure,
    setContestStatus,
    setContestSubcategory} from '../services/dataSetters';

const initialState: Contest = {
    id: "",
    name: "",
    status: "INACTIVE",
    category: "CATEGORY1",
    subcategory: "SUBCATEGORY1",
    backgroundImage: "",
    participantAmount: 0,
    maxAllowedParticipantAmount: 0,
    dateStart: [0, 0, 0, 0, 0, 0],
    dateEnd: [0, 0, 0, 0, 0, 0],
    description: "",
    exampleMedia: [],
    prizeStructure: {
        id: "", 
        place: 0, 
        prize: {
            id: "",
            currency: "EUR",
            prizeAmount: 0,
            prizeText: "",
            prizeType: "MONEY"
        }, 
        winnersAmount: 0
    },
    contestOwner: {
        id: "",
        name: "",
        organizerRating: 0,
        profileImage: "",
        verificationStatus: "BLOGGER"
    }
};

const slice = createSlice({
    name: 'contestsCreationPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setContestName.fulfilled, (state, action) => {
                state.name = action.payload;
            })
            .addCase(setContestDescription.fulfilled, (state, action) => {
                state.description = action.payload;
            })
            .addCase(setContestStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            })
            .addCase(setContestCategory.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addCase(setContestSubcategory.fulfilled, (state, action) => {
                state.subcategory = action.payload;
            })
            .addCase(setContestBackgroundImage.fulfilled, (state, action) => {
                state.backgroundImage = action.payload;
            })
            .addCase(setContestParticipantAmount.fulfilled, (state, action) => {
                state.participantAmount = action.payload;
            })
            .addCase(setContestMaxAllowedParticipantAmount.fulfilled, (state, action) => {
                state.maxAllowedParticipantAmount = action.payload;
            })
            .addCase(setContestDateStart.fulfilled, (state, action) => {
                state.dateStart = action.payload;
            })
            .addCase(setContestDateEnd.fulfilled, (state, action) => {
                state.dateEnd = action.payload;
            })
            .addCase(setContestExampleMedia.fulfilled, (state, action) => {
                state.exampleMedia = action.payload;
            })
            .addCase(setContestPrizeStructure.fulfilled, (state, action) => {
                state.prizeStructure = action.payload;
            })
            .addCase(setContestOwner.fulfilled, (state, action) => {
                state.contestOwner = action.payload;
            });
    }
});

export const { reducer: contestsCreationPageReducer, actions: contestsCreationPageActions } = slice;
