export const selectWorks = (state: RootState) => state.works.works

export const selectHasMore = (state: RootState) => state.works.hasMore

export const selectPage = (state: RootState) => state.works.page

export const selectLoading = (state: RootState) => state.works.loading

export const selectError = (state: RootState) => state.works.error
