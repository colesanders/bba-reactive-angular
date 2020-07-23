import { Lesson } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LessonsActions from './lessons.actions';

export const LESSONS_FEATURE_KEY = 'lessons';

// HELPER: Initial state
const inititalState = [
  {
    id: '1',
    title: 'Angular Lesson',
    description: 'This is an Angular Lesson',
    course_id: '1'
  },
  {
    id: '2',
    title: 'Another Angular Lesson',
    description: 'This is another Angular Lesson',
    course_id: '1'
  },
  {
    id: '3',
    title: 'React Lesson',
    description: 'This is a React Lesson',
    course_id: '2'
  },
  {
    id: '4',
    title: 'Another React Lesson',
    description: 'This is another React Lesson',
    course_id: '2'
  }
];

// HELPER: Immutable operations
const create = (collection, obj) => [...collection, obj];
const update = (collection, obj) =>
  collection.map((i) => {
    return i.id === obj.id ? Object.assign({}, obj) : i;
  });
const remove = (collection, obj) => collection.filter((i) => i.id === obj.id);
