import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { CoursesService } from '@bba/core-data';
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

  selectedCourses$ = this.selectedCourse.asObservable();

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
      action.type === CoursesActions.createCourse({} as any).type ||
      action.type === CoursesActions.updateCourse({} as any).type ||
      action.type === CoursesActions.deleteCourse({} as any).type
    )
  );

  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));

  constructor(
    private coursesService: CoursesService,
    private store: Store<fromCourses.CoursesPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCourse(course: Course) {
    this.selectedCourse.next(course); // temporary
    this.dispatch(CoursesActions.selectCourse({ selectedId: course?.id }));
  }

  loadCourses() {
    this.coursesService
      .all()
      .subscribe((courses: Course[]) =>
        this.dispatch(CoursesActions.loadCourses({ courses }))
      );
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
