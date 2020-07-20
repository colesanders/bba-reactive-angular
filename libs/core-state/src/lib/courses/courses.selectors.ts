import { Course } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { empty } from 'rxjs';
import {
  COURSES_FEATURE_KEY,
  CoursesState,
  CoursesPartialState,
  coursesAdapter
} from './courses.reducer';

// Lookup the 'Courses' feature state managed by NgRx
export const getCoursesState = createFeatureSelector<
  CoursesPartialState,
  CoursesState
>(COURSES_FEATURE_KEY);

const { selectAll, selectEntities } = coursesAdapter.getSelectors();

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

export const getSelectedCourseId = createSelector(
  getCoursesState,
  (state: CoursesState) => state.selectedId
);

const emptyCourse: Course = { id: null, title: '', description: '' };

export const getSelectedCourse = createSelector(
  getCoursesEntities,
  getSelectedCourseId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyCourse;
  }
);
