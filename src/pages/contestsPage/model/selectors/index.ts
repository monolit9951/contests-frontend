export const selectPopular = (state: RootState) => state.contestsPage.popular

export const selectAll = (state: RootState) => state.contestsPage.all

export const selectPage = (state: RootState) => state.contestsPage.all.page

export const selectPageSize = (state: RootState) =>
    state.contestsPage.all.pageSize

export const selectNextLoading = (state: RootState) =>
    state.contestsPage.all.nextLoading
