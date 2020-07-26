import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getCourseLessons } from '../index';
import * as CoursesActions from './courses.actions';
import * as fromCourses from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  selectedCourse$ = this.store.pipe(select(CoursesSelectors.getSelectedCourse));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  courseLessons$ = this.store.pipe(select(getCourseLessons));

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
