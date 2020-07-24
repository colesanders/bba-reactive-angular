import { Course } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesAdapter, CoursesState, COURSES_FEATURE_KEY } from './courses.reducer';

export const getCoursesState = createFeatureSelector<
  CoursesState
>(COURSES_FEATURE_KEY);

const { selectAll, selectEntities } = coursesAdapter.getSelectors();

export const getSelectedCourseId = createSelector(
  getCoursesState,
  (state: CoursesState) => state.selectedId
);

export const getCoursesLoaded = createSelector(
  getCoursesState,
  (state: CoursesState) => state.loaded
);

export const getCoursesError = createSelector(
  getCoursesState,
  (state: CoursesState) => state.error
);

export const getAllCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => selectAll(state)
);

export const getCoursesEntities = createSelector(
  getCoursesState,
  (state: CoursesState) => selectEntities(state)
);
