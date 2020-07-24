import { Course } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

export const COURSES_FEATURE_KEY = 'courses';

export interface CoursesPartialState {
  readonly [COURSES_FEATURE_KEY]: CoursesState;
}

export interface CoursesState extends EntityState<Course> {
  selectedId?: string;
  loaded: boolean;
  error?: string | null;
}

export const coursesAdapter: EntityAdapter<Course> = createEntityAdapter();

export const initialCoursesState: CoursesState = coursesAdapter.getInitialState(
  {
    loaded: false,
  }
);

const _coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.selectCourse, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) =>
    coursesAdapter.setAll(courses, { ...state, loaded: true })
  ),
  on(CoursesActions.createCourseSuccess, (state, { course }) =>
    coursesAdapter.addOne(course, state)
  ),
  on(CoursesActions.updateCourseSuccess, (state, { course }) =>
    coursesAdapter.updateOne({ id: course.id, changes: course }, state)
  ),
  on(CoursesActions.deleteCourseSuccess, (state, { course }) =>
    coursesAdapter.removeOne(course.id, state)
  )
);

export function coursesReducer(
  state: CoursesState = initialCoursesState,
  action: Action
) {
  return _coursesReducer(state, action);
}
