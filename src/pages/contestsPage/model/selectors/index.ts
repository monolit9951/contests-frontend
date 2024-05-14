export const selectContests = (state: RootState) => state.contestsPage.contests

export const selectPage = (state: RootState) => state.contestsPage.page

export const selectPageSize = (state: RootState) => state.contestsPage.pageSize

export const selectSortDirection = (state: RootState) =>
    state.contestsPage.sortDirection

export const selectLoading = (state: RootState) => state.contestsPage.loading

export const selectError = (state: RootState) => state.contestsPage.error
