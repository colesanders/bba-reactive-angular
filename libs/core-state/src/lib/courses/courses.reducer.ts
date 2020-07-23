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

export function coursesReducer(
  state: CoursesState = initialCoursesState,
  action: Action
) {
  switch (action.type) {
    case 'selectCourse':
      return {
        selectedId: action['selectedId'],
        courses: state.courses,
      };
    case 'setAllCourses':
      return {
        selectedId: state.selectedId,
        courses: action['courses']
      };
    case 'createCourse':
      return {
        selectedId: state.selectedId,
        courses: create(state.courses, action['course']),
      };
    case 'updateCourse':
      return {
        selectedId: state.selectedId,
        courses: update(state.courses, action['course']),
      };
    case 'removeCourse':
      return {
        selectedId: state.selectedId,
        courses: remove(state.courses, action['course']),
      };
    default:
      return state;
  }
}
