import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as fromCourses from './courses.reducer';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { getCourseLessons } from '../index';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  selectedCourse$ = this.store.pipe(select(CoursesSelectors.getSelectedCourse));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  courseLessons$ = this.store.pipe(select(getCourseLessons))

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
      action.type === CoursesActions.createCourse({} as any).type ||
      action.type === CoursesActions.updateCourse({} as any).type ||
      action.type === CoursesActions.deleteCourse({} as any).type
    )
  );

  constructor(
    private store: Store<fromCourses.CoursesPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCourse(course: Course) {
    this.dispatch(CoursesActions.selectCourse({ selectedId: course?.id }));
  }

  loadCourses() {
    this.dispatch(CoursesActions.loadCourses())
  }

  saveCourse(course: Course) {
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.createCourse(course);
    }
  }

  createCourse(course: Course) {
    this.dispatch(CoursesActions.createCourse({ course }));
  }

  updateCourse(course: Course) {
    this.dispatch(CoursesActions.updateCourse({ course }));
  }

  deleteCourse(course: Course) {
    this.dispatch(CoursesActions.deleteCourse({ course }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
