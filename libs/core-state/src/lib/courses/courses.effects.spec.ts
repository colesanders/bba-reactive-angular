import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { CoursesEffects } from './courses.effects';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '@bba/core-data';
import { mockCoursesService, mockCourse } from '../tests.mocks';

describe('CoursesEffects', () => {
  let actions: Observable<any>;
  let effects: CoursesEffects;
  let service: CoursesService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CoursesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: CoursesService, useValue: mockCoursesService },
      ],
    });

    effects = TestBed.inject(CoursesEffects);
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCourses$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.loadCourses() });

      const expected = hot('-a-|', {
        a: CoursesActions.loadCoursesSuccess({ courses: [] }),
      });

      expect(effects.loadCourses$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: CoursesActions.loadCourses() });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'all');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: CoursesActions.loadCoursesFailure({ error }) });

      expect(effects.loadCourses$).toBeObservable(expected);
    });
  });

  describe('loadCourse$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.loadCourse({ courseId: mockCourse.id }) });

      const expected = hot('-a-|', {
        a: CoursesActions.loadCourseSuccess({ course: {...mockCourse} }),
      });

      expect(effects.loadCourse$).toBeObservable(expected);
    });
  });

  describe('createCourse$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.createCourse({ course: mockCourse }) });

      const expected = hot('-a-|', {
        a: CoursesActions.createCourseSuccess({ course: {...mockCourse} }),
      });

      expect(effects.createCourse$).toBeObservable(expected);
    });
  });

  describe('updateCourse$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.updateCourse({ course: mockCourse }) });

      const expected = hot('-a-|', {
        a: CoursesActions.updateCourseSuccess({ course: {...mockCourse} }),
      });

      expect(effects.updateCourse$).toBeObservable(expected);
    });
  });

  describe('deleteCourse$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoursesActions.deleteCourse({ course: mockCourse }) });

      const expected = hot('-a-|', {
        a: CoursesActions.deleteCourseSuccess({ course: {...mockCourse} }),
      });

      expect(effects.deleteCourse$).toBeObservable(expected);
    });
  });

});
