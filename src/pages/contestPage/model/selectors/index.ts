export const selectContestOwnerId = (state: RootState) =>
    state.contestWorks.ownerId

export const selectContestMedia = (state: RootState) => state.contestWorks.media

export const selectContestText = (state: RootState) => state.contestWorks.text

export const selectContestComments = (state: RootState) =>
    state.contestWorks.comments
