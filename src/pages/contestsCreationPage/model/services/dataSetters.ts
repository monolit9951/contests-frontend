// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { Contest } from 'entities/contest';
// import {PrizeStructure} from "entities/prize/model/types"
// import {Organizer} from "entities/user/model/types"

// // Example async actions for updating contest properties
// export const setContestName = createAsyncThunk(
//     'contestsCreationPage/setContestName',
//     async (name: string, thunkAPI) => {
//         return name;
//     }
// );

// export const setContestDescription = createAsyncThunk(
//     'contestsCreationPage/setContestDescription',
//     async (description: string, thunkAPI) => {
//         return description;
//     }
// );

// export const setContestStatus = createAsyncThunk(
//     'contestsCreationPage/setContestStatus',
//     async (status: Contest['status'], thunkAPI) => {
//         return status;
//     }
// );

// export const setContestCategory = createAsyncThunk(
//     'contestsCreationPage/setContestCategory',
//     async (category: Contest['category'], thunkAPI) => {
//         return category;
//     }
// );

// export const setContestSubcategory = createAsyncThunk(
//     'contestsCreationPage/setContestSubcategory',
//     async (subcategory: Contest['subcategory'], thunkAPI) => {
//         return subcategory;
//     }
// );

// export const setContestBackgroundImage = createAsyncThunk(
//     'contestsCreationPage/setContestBackgroundImage',
//     async (backgroundImage: string, thunkAPI) => {
//         return backgroundImage;
//     }
// );

// export const setContestParticipantAmount = createAsyncThunk(
//     'contestsCreationPage/setContestParticipantAmount',
//     async (participantAmount: number, thunkAPI) => {
//         return participantAmount;
//     }
// );

// export const setContestMaxAllowedParticipantAmount = createAsyncThunk(
//     'contestsCreationPage/setContestMaxAllowedParticipantAmount',
//     async (maxAllowedParticipantAmount: number, thunkAPI) => {
//         return maxAllowedParticipantAmount;
//     }
// );

// export const setContestDateStart = createAsyncThunk(
//     'contestsCreationPage/setContestDateStart',
//     async (dateStart: number[], thunkAPI) => {
//         return dateStart;
//     }
// );

// export const setContestDateEnd = createAsyncThunk(
//     'contestsCreationPage/setContestDateEnd',
//     async (dateEnd: number[], thunkAPI) => {
//         return dateEnd;
//     }
// );

// export const setContestExampleMedia = createAsyncThunk(
//     'contestsCreationPage/setContestExampleMedia',
//     async (exampleMedia: string[], thunkAPI) => {
//         return exampleMedia;
//     }
// );

// export const setContestPrizeStructure = createAsyncThunk(
//     'contestsCreationPage/setContestPrizeStructure',
//     async (prizeStructure: PrizeStructure, thunkAPI) => {
//         return prizeStructure;
//     }
// );

// export const setContestOwner = createAsyncThunk(
//     'contestsCreationPage/setContestOwner',
//     async (contestOwner: Organizer, thunkAPI) => {
//         return contestOwner;
//     }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contest } from 'entities/contest';
import {PrizeStructure} from "entities/prize/model/types"
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
    async (dateStart: number[]) => {
        return dateStart;
    }
);

export const setContestDateEnd = createAsyncThunk(
    'contestsCreationPage/setContestDateEnd',
    async (dateEnd: number[]) => {
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
    async (prizeStructure: PrizeStructure) => {
        return prizeStructure;
    }
);

export const setContestOwner = createAsyncThunk(
    'contestsCreationPage/setContestOwner',
    async (contestOwner: Organizer) => {
        return contestOwner;
    }
);
