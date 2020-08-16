import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { UsersService } from '@bba/core-data';
import { mockUsersService } from '../tests.mocks';

describe('UsersEffects', () => {
  let actions: Observable<any>;
  let effects: UsersEffects;
  let service: UsersService

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
  });
});
