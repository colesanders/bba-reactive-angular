import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store, ActionsSubject } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LessonsEffects } from './lessons.effects';
import { LessonsFacade } from './lessons.facade';

import * as LessonsSelectors from './lessons.selectors';
import * as LessonsActions from './lessons.actions';
import {
  LESSONS_FEATURE_KEY,
  LessonsState,
  initialLessonsState,
  lessonsReducer,
} from './lessons.reducer';

describe('LessonsFacade', () => {
  let facade: LessonsFacade;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      providers: [
        LessonsFacade,
        Store,
        ActionsSubject,
      ],
    });

    facade = TestBed.inject(LessonsFacade);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
