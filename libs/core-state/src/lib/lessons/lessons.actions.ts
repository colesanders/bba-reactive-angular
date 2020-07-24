import { Lesson } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const selectLesson = createAction(
  '[Lessons] Select Lesson',
  props<{ selectedId: string }>()
);

export const loadLessons = createAction(
  '[Lessons] Load Lessons'
);

export const loadLessonsSuccess = createAction(
  '[Lessons] Load Lessons Success',
  props<{ lessons: Lesson[] }>()
);

export const loadLessonsFailure = createAction(
  '[Lessons] Load Lessons Failure',
  props<{ error: any }>()
);

export const createLesson = createAction(
  '[Lessons] Create Lesson',
  props<{ lesson: Lesson }>()
);

export const createLessonSuccess = createAction(
  '[Lessons] Create Lesson Success',
  props<{ lesson: Lesson }>()
);

export const createLessonFailure = createAction(
  '[Lessons] Create Lesson Failure',
  props<{ error: any }>()
);

export const updateLesson = createAction(
  '[Lessons] Update Lesson',
  props<{ lesson: Lesson }>()
);

export const updateLessonSuccess = createAction(
  '[Lessons] Update Lesson Success',
  props<{ lesson: Lesson }>()
);

export const updateLessonFailure = createAction(
  '[Lessons] Update Lesson Failure',
  props<{ error: any }>()
);

export const deleteLesson = createAction(
  '[Lessons] Delete Lesson',
  props<{ lesson: Lesson }>()
);

export const deleteLessonSuccess = createAction(
  '[Lessons] Delete Lesson Success',
  props<{ lesson: Lesson }>()
);

export const deleteLessonFailure = createAction(
  '[Lessons] Delete Lesson Failure',
  props<{ error: any }>()
);
