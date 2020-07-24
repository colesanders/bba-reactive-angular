import { Course } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const selectCourse = createAction(
  '[Courses] Select Course',
  props<{ selectedId: string }>()
);

export const loadCourses = createAction(
  '[Courses] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);

export const createCourseSuccess = createAction(
  '[Courses] Create Course Success',
  props<{ course: Course }>()
);

export const createCourseFailure = createAction(
  '[Courses] Create Course Failure',
  props<{ error: any }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ course: Course }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ course: Course }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>()
);
