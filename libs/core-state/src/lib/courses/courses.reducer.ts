import { Course } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

export const COURSES_FEATURE_KEY = 'courses';

// HELPER: Initial state
const inititalCourses = [
  {
    id: '1',
    title: 'Angular Course',
    description: 'This is an Angular Course',
  },
  {
    id: '2',
    title: 'Another Angular Course',
    description: 'This is another Angular Course',
  },
];

// HELPER: Immutable operations
const create = (collection, obj) => [...collection, obj];
const update = (collection, obj) =>
  collection.map((i) => {
    return i.id === obj.id ? Object.assign({}, obj) : i;
  });
const remove = (collection, obj) => collection.filter((i) => i.id === obj.id);

export interface CoursesPartialState {
  readonly [COURSES_FEATURE_KEY]: CoursesState;
}

export interface CoursesState {
  selectedId: string | null;
  courses: Course[];
}

export const initialCoursesState: CoursesState = {
  selectedId: null,
  courses: inititalCourses,
};

const _coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.selectCourse, (state, { selectedId }) => ({
    selectedId,
    courses: state.courses,
  })),
  on(CoursesActions.loadCourses, (state, { courses }) => ({
    selectedId: state.selectedId,
    courses,
  })),
  on(CoursesActions.createCourse, (state, { course }) => ({
    selectedId: state.selectedId,
    courses: create(state.courses, course),
  })),
  on(CoursesActions.updateCourse, (state, { course }) => ({
    selectedId: state.selectedId,
    courses: update(state.courses, course),
  })),
  on(CoursesActions.deleteCourse, (state, { course }) => ({
    selectedId: state.selectedId,
    courses: remove(state.courses, course),
  }))
);

export function coursesReducer(
  state: CoursesState = initialCoursesState,
  action: Action
) {
  return _coursesReducer(state, action);
}
