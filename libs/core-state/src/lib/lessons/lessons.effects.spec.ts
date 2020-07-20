import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LessonsEffects } from './lessons.effects';
import * as LessonsActions from './lessons.actions';

describe('LessonsEffects', () => {
  let actions: Observable<any>;
  let effects: LessonsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LessonsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(LessonsEffects);
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
