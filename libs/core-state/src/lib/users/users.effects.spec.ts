import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { UsersService } from '@bba/core-data';
import { mockUsersService, mockUser } from '@bba/testing';

describe('UsersEffects', () => {
  let actions: Observable<any>;
  let effects: UsersEffects;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UsersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: UsersService, useValue: mockUsersService },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUsers$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.loadUsers() });

      const expected = hot('-a-|', {
        a: UsersActions.loadUsersSuccess({ users: [] }),
      });

      expect(effects.loadUsers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: UsersActions.loadUsers() });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'all');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: UsersActions.loadUsersFailure({ error }) });

      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });

  describe('loadUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.loadUser({ userId: mockUser.id }) });

      const expected = hot('-a-|', {
        a: UsersActions.loadUserSuccess({ user: {...mockUser} }),
      });

      expect(effects.loadUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: UsersActions.loadUser({userId: mockUser.id}) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'find');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: UsersActions.loadUserFailure({ error }) });

      expect(effects.loadUser$).toBeObservable(expected);
    });
  });

  describe('createUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.createUser({ user: mockUser }) });

      const expected = hot('-a-|', {
        a: UsersActions.createUserSuccess({ user: {...mockUser} }),
      });

      expect(effects.createUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: UsersActions.createUser({ user: mockUser }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'create');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: UsersActions.createUserFailure({ error }) });

      expect(effects.createUser$).toBeObservable(expected);
    });
  });

  describe('updateUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.updateUser({ user: mockUser }) });

      const expected = hot('-a-|', {
        a: UsersActions.updateUserSuccess({ user: {...mockUser} }),
      });

      expect(effects.updateUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: UsersActions.updateUser({ user: mockUser }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'update');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: UsersActions.updateUserFailure({ error }) });

      expect(effects.updateUser$).toBeObservable(expected);
    });
  });

  describe('deleteUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.deleteUser({ user: mockUser }) });

      const expected = hot('-a-|', {
        a: UsersActions.deleteUserSuccess({ user: {...mockUser} }),
      });

      expect(effects.deleteUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: UsersActions.deleteUser({ user: mockUser }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'delete');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: UsersActions.deleteUserFailure({ error }) });

      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });

});
