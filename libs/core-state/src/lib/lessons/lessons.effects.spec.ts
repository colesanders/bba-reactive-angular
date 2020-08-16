import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LessonsEffects } from './lessons.effects';
import * as LessonsActions from './lessons.actions';
import { LessonsService } from '@bba/core-data';
import { mockLessonsService } from '../tests.mocks';

describe('LessonsEffects', () => {
  let actions: Observable<any>;
  let effects: LessonsEffects;
  let service: LessonsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LessonsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: LessonsService, useValue: mockLessonsService },
      ],
    });

    effects = TestBed.inject(LessonsEffects);
    service = TestBed.inject(LessonsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadLessons$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.loadLessons() });

      const expected = hot('-a-|', {
        a: LessonsActions.loadLessonsSuccess({ lessons: [] }),
      });

      expect(effects.loadLessons$).toBeObservable(expected);
    });
  });
});
