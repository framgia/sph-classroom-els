import { createSelector } from 'reselect';

export const auth = createSelector(
  (state) => state.auth,
  (auth) => auth.user
);

export const isFetching = createSelector(
  (state) => state.auth,
  (auth) => auth.isFetching
);
