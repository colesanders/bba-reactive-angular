import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CoursesEffects } from './courses.effects';
import * as CoursesActions from './courses.actions';

describe('CoursesEffects', () => {
  let actions: Observable<any>;
  let effects: CoursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CoursesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CoursesEffects);
  });

  describe('loadCourses$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.loadCourses() });

      const expected = hot('-a-|', {
        a: CoursesActions.loadCoursesSuccess({ courses: [] }),
      });

      expect(effects.loadCourses$).toBeObservable(expected);
    });
  });
});
