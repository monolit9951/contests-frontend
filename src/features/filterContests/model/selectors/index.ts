export const selectSelectedFilters = (state: RootState) => state.filter.selected

export const selectActiveFilters = (state: RootState) => state.filter.active

export const selectLoading = (state: RootState) => state.filter.loading

export const selectError = (state: RootState) => state.filter.error
