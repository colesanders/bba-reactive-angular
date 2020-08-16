import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst, hot } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store, ActionsSubject, createAction } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CoursesEffects } from './courses.effects';
import { CoursesFacade } from './courses.facade';

import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';
import {
  COURSES_FEATURE_KEY,
  CoursesState,
  initialCoursesState,
  coursesReducer,
} from './courses.reducer';
import { Course } from '@bba/api-interfaces';
import { mockCourse } from '../tests.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('CoursesFacade', () => {
  let facade: CoursesFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesFacade,
        provideMockStore({ initialState: initialCoursesState }),
        { provide: ActionsSubject, useValue: mockActionsSubject }
      ],
    });

    facade = TestBed.inject(CoursesFacade);
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
    const action = CoursesActions.createCourse({course: mockCourse})
    actionSubject.next(action);

    let result;
    facade.mutations$.subscribe((ret) => {
      result = ret;
    })

    expect(result).toBe(action);
  })

  describe('should dispatch', () => {

    it('select on select(course.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectCourse(mockCourse.id);

      const action = CoursesActions.selectCourse({ selectedId: mockCourse.id});

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('loadCourses on loadCourses()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCourses();

      const action = CoursesActions.loadCourses();

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('loadCourse on loadCourse(course.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCourse(mockCourse.id);

      const action = CoursesActions.loadCourse({ courseId: mockCourse.id });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('createCourse on createCourse(course)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createCourse(mockCourse);

      const action = CoursesActions.createCourse({ course: mockCourse });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('updateCourse on updateCourse(course)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateCourse(mockCourse);

      const action = CoursesActions.updateCourse({ course: mockCourse });

      expect(spy).toHaveBeenCalledWith(action);
    })

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteCourse(mockCourse);

      const action = CoursesActions.deleteCourse({ course: mockCourse });

      expect(spy).toHaveBeenCalledWith(action);
    })
  })

});
