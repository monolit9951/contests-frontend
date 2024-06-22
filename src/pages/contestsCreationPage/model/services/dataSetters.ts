import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contest } from 'entities/contest';
import {Organizer} from "entities/user/model/types"

export const setContestName = createAsyncThunk(
    'contestsCreationPage/setContestName',
    async (name: string) => {
        return name;
    }
);

export const setContestDescription = createAsyncThunk(
    'contestsCreationPage/setContestDescription',
    async (description: string) => {
        return description;
    }
);

export const setContestStatus = createAsyncThunk(
    'contestsCreationPage/setContestStatus',
    async (status: Contest['status']) => {
        return status;
    }
);

export const setContestCategory = createAsyncThunk(
    'contestsCreationPage/setContestCategory',
    async (category: Contest['category']) => {
        return category;
    }
);

export const setContestSubcategory = createAsyncThunk(
    'contestsCreationPage/setContestSubcategory',
    async (subcategory: Contest['subcategory']) => {
        return subcategory;
    }
);

export const setContestBackgroundImage = createAsyncThunk(
    'contestsCreationPage/setContestBackgroundImage',
    async (backgroundImage: string) => {
        return backgroundImage;
    }
);

export const setContestPreivewImage = createAsyncThunk(
    'contestsCreationPage/setContestPreivewImage',
    async (preivewImage: string) => {
        return preivewImage;
    }
);

export const setContestParticipantAmount = createAsyncThunk(
    'contestsCreationPage/setContestParticipantAmount',
    async (participantAmount: number) => {
        return participantAmount;
    }
);

export const setContestMaxAllowedParticipantAmount = createAsyncThunk(
    'contestsCreationPage/setContestMaxAllowedParticipantAmount',
    async (maxAllowedParticipantAmount: number) => {
        return maxAllowedParticipantAmount;
    }
);

export const setContestDateStart = createAsyncThunk(
    'contestsCreationPage/setContestDateStart',
    async (dateStart: string) => {
        return dateStart;
    }
);

export const setContestDateEnd = createAsyncThunk(
    'contestsCreationPage/setContestDateEnd',
    async (dateEnd: string) => {
        return dateEnd;
    }
);

export const setContestExampleMedia = createAsyncThunk(
    'contestsCreationPage/setContestExampleMedia',
    async (exampleMedia: string[]) => {
        return exampleMedia;
    }
);

export const setContestPrizeStructure = createAsyncThunk(
    'contestsCreationPage/setContestPrizeStructure',
    async (prizeStructure) => {
        return prizeStructure;
    }
);

export const setContestOwner = createAsyncThunk(
    'contestsCreationPage/setContestOwner',
    async (contestOwner: Organizer) => {
        return contestOwner;
    }
);

export const setContestOpen = createAsyncThunk(
    'contestsCreationPage/setContestOpen',
    async (contestOpen: boolean) => {
        return contestOpen;
    }
);

export const setSelectionType = createAsyncThunk(
    'contestsCreationPage/setSelectionType',
    async (selectionType: string) => {
        return selectionType;
    }
);