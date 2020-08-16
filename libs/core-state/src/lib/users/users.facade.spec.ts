import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store, ActionsSubject } from '@ngrx/store';

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


describe('UsersFacade', () => {
  let facade: UsersFacade;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        UsersFacade,
        Store,
        ActionsSubject,
      ],
    });

    facade = TestBed.inject(UsersFacade);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
