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
  private allCourses = new Subject<Course[]>();
  private selectedCourse = new Subject<Course>();
  private mutations = new Subject();

  selectedCourses$ = this.selectedCourse.asObservable();
  mutations$ = this.mutations.asObservable();

  allCourses$ = this.store.pipe(
    select('courses'),
    map(state => state.courses)
  );

  constructor(
    private coursesService: CoursesService,
    private store: Store<fromCourses.CoursesPartialState>
  ) {}

  reset() {
    this.mutations.next(true);
  }

  selectCourse(course: Course) {
    this.selectedCourse.next(course);
  }

  loadCourses() {
    this.coursesService
      .all()
      .subscribe((courses: Course[]) => this.allCourses.next(courses));
  }

  createCourse(course: Course) {
    this.coursesService.create(course).subscribe((_) => this.reset());
  }

  updateCourse(course: Course) {
    this.coursesService.update(course).subscribe((_) => this.reset());
  }

  deleteCourse(course: Course) {
    this.coursesService.delete(course.id).subscribe((_) => this.reset());
  }
}
