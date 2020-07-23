import { Lesson } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LessonsActions from './lessons.actions';

export const LESSONS_FEATURE_KEY = 'lessons';

// HELPER: Initial state
const inititalLessons = [
  {
    id: '1',
    title: 'Angular Lesson',
    description: 'This is an Angular Lesson',
    course_id: '1',
  },
  {
    id: '2',
    title: 'Another Angular Lesson',
    description: 'This is another Angular Lesson',
    course_id: '1',
  },
  {
    id: '3',
    title: 'React Lesson',
    description: 'This is a React Lesson',
    course_id: '2',
  },
  {
    id: '4',
    title: 'Another React Lesson',
    description: 'This is another React Lesson',
    course_id: '2',
  },
];

// HELPER: Immutable operations
const create = (collection, obj) => [...collection, obj];
const update = (collection, obj) => {
  console.log('COLLECTION', collection);
  console.log('OBJ', obj);
  return collection.map((i) => {
    return i.id === obj.id ? Object.assign({}, obj) : i;
  })
};
const remove = (collection, obj) => collection.filter((i) => i.id === obj.id);

export interface LessonsPartialState {
  readonly [LESSONS_FEATURE_KEY]: LessonsState;
}

export interface LessonsState {
  selectedId: string | null;
  lessons: Lesson[];
}

export const initialLessonsState: LessonsState = {
  selectedId: null,
  lessons: inititalLessons,
};

export function lessonsReducer(
  state: LessonsState = initialLessonsState,
  action: Action
) {
  switch (action.type) {
    case 'selectLesson':
      return {
        selectedId: action['selectedId'],
        lessons: state.lessons,
      };
    case 'setAllLessons':
      return {
        selectedId: state.selectedId,
        lessons: action['lessons']
      };
    case 'createLesson':
      return {
        selectedId: state.selectedId,
        lessons: create(state.lessons, action['lesson']),
      };
    case 'updateLesson':
      return {
        selectedId: state.selectedId,
        lessons: update(state.lessons, action['lesson']),
      };
    case 'removeLesson':
      return {
        selectedId: state.selectedId,
        lessons: remove(state.lessons, action['lesson']),
      };
    default:
      return state;
  }
}
