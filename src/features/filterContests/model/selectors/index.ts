export const selectSelectedFilters = (state: RootState) => state.filter.selected

export const selectActiveFilters = (state: RootState) => state.filter.active

export const selectSortDirection = (state: RootState) =>
    state.filter.sortDirection

export const selectLoading = (state: RootState) => state.filter.loading

export const selectError = (state: RootState) => state.filter.error
