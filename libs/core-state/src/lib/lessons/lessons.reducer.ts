import { Lesson } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LessonsActions from './lessons.actions';

export const LESSONS_FEATURE_KEY = 'lessons';

export interface LessonsPartialState {
  readonly [LESSONS_FEATURE_KEY]: LessonsState;
}

export interface LessonsState extends EntityState<Lesson> {
  selectedId?: string;
  loading: boolean;
  error?: string | null
}

export const lessonsAdapter: EntityAdapter<Lesson> = createEntityAdapter();

export const initialLessonsState: LessonsState = lessonsAdapter.getInitialState({
  loading: false
});

const _lessonsReducer = createReducer(
  initialLessonsState,
  on(LessonsActions.selectLesson, (state, { selectedId }) => Object.assign({}, state, { selectedId })),
  on(LessonsActions.loadLessons,  (state, { lessons }) => lessonsAdapter.setAll(lessons, { ...state, loaded: true })),
  on(LessonsActions.createLesson, (state, { lesson }) => lessonsAdapter.addOne(lesson, state)),
  on(LessonsActions.updateLesson, (state, { lesson }) => lessonsAdapter.updateOne({ id: lesson.id, changes: lesson}, state)),
  on(LessonsActions.deleteLesson, (state, { lesson }) => lessonsAdapter.removeOne(lesson.id, state)),
);

export function lessonsReducer(
  state: LessonsState,
  action: Action
) {
  return _lessonsReducer(state, action);
}
