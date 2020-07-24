import { Lesson } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const selectLesson = createAction(
  '[Lessons] Select Lesson',
  props<{ selectedId: string }>()
);

export const loadLessons = createAction(
  '[Lessons] Load Lessons',
  props<{ lessons: Lesson[]}>()
);

export const createLesson = createAction(
  '[Lessons] Create Lesson',
  props<{ lesson: Lesson }>()
);

export const updateLesson = createAction(
  '[Lessons] Update Lesson',
  props<{ lesson: Lesson }>()
);

export const deleteLesson = createAction(
  '[Lessons] Delete Lesson',
  props<{ lesson: Lesson }>()
);
