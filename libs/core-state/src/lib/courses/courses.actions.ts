import { Course } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const selectCourse = createAction(
  '[Courses] Select Course',
  props<{ selectedId: string }>()
);

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ courses: Course[]}>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ course: Course }>()
);
