import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as fromCourses from './courses.reducer';

import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  private selectedCourse = new Subject<Course>();
  private mutations = new Subject();

  selectedCourses$ = this.selectedCourse.asObservable();
  mutations$ = this.mutations.asObservable();
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));

  constructor(
    private store: Store<fromCourses.CoursesPartialState>
  ) {}

  reset() {
    this.mutations.next(true);
  }

  selectCourse(course: Course) {
    this.selectedCourse.next(course); // temporary
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
