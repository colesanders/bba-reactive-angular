import { Lesson } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lessonsAdapter, LessonsState, LESSONS_FEATURE_KEY } from './lessons.reducer';

export const getLessonsState = createFeatureSelector<
  LessonsState
>(LESSONS_FEATURE_KEY);

const { selectAll } = lessonsAdapter.getSelectors();

export const getSelectedLessonId = createSelector(
  getLessonsState,
  (state: LessonsState) => state.selectedId
);

export const getLessonsLoaded = createSelector(
  getLessonsState,
  (state: LessonsState) => state.loaded
);

export const getLessonsError = createSelector(
  getLessonsState,
  (state: LessonsState) => state.error
);

export const getAllLessons = createSelector(
  getLessonsState,
  (state: LessonsState) => selectAll(state)
);
