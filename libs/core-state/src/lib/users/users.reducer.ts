import { User } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.resetUsers, state => usersAdapter.removeAll(state)),
  on(UsersActions.resetSelectedUser, state => Object.assign({}, state, { selectedId: null })),
  on(UsersActions.selectUser, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load users
  on(
    UsersActions.loadUsers,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    UsersActions.loadUsersSuccess,
    (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true })
  ),
  on(
    UsersActions.loadUsersFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Load user
  on(
    UsersActions.loadUser,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    UsersActions.loadUserSuccess,
    (state, { user }) =>
    usersAdapter.upsertOne(user, { ...state, loaded: true })
  ),
  on(
    UsersActions.loadUserFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Add user
  on(UsersActions.createUserSuccess, (state, { user }) =>
    usersAdapter.addOne(user, state)
  ),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Update user
  on(UsersActions.updateUserSuccess, (state, { user }) =>
    usersAdapter.updateOne({ id: user.id, changes: user }, state)
  ),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Delete user
  on(UsersActions.deleteUserSuccess, (state, { user }) =>
    usersAdapter.removeOne(user.id, state)
  ),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
