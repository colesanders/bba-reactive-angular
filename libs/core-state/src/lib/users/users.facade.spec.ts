import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst, hot } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store, ActionsSubject, createAction } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';

import * as UsersSelectors from './users.selectors';
import * as UsersActions from './users.actions';
import {
  USERS_FEATURE_KEY,
  UsersState,
  initialUsersState,
  usersReducer,
} from './users.reducer';
import { User } from '@bba/api-interfaces';
import { mockUser } from '../tests.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersFacade,
        provideMockStore({ initialState: initialUsersState }),
        { provide: ActionsSubject, useValue: mockActionsSubject }
      ],
    });

    facade = TestBed.inject(UsersFacade);
    actionSubject = TestBed.inject(ActionsSubject)
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have no mutations', () => {
    let result;
    facade.mutations$.subscribe((ret) => {
      result = ret;
    })

    expect(result).toBe(undefined);
  })

  it('should have mutations', () => {
    const action = UsersActions.createUser({user: mockUser})
    actionSubject.next(action);

    let result;
    facade.mutations$.subscribe((ret) => {
      result = ret;
    })

    expect(result).toBe(action);
  })

  describe('should dispatch', () => {

    it('select on select(user.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectUser(mockUser.id);

      const action = UsersActions.selectUser({ selectedId: mockUser.id});

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('loadUsers on loadUsers()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadUsers();

      const action = UsersActions.loadUsers();

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('loadUser on loadUser(user.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadUser(mockUser.id);

      const action = UsersActions.loadUser({ userId: mockUser.id });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('createUser on createUser(user)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createUser(mockUser);

      const action = UsersActions.createUser({ user: mockUser });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('updateUser on updateUser(user)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateUser(mockUser);

      const action = UsersActions.updateUser({ user: mockUser });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteUser(mockUser);

      const action = UsersActions.deleteUser({ user: mockUser });

      expect(spy).toHaveBeenCalledWith(action);
    })
  })

});
