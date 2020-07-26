import { Lesson } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LessonsActions from './lessons.actions';

export const LESSONS_FEATURE_KEY = 'lessons';

// HELPER: Initial state
const inititalLessons = [
  {
    id: '1',
    title: 'Mock Angular Lesson',
    description: 'This is an Angular Lesson',
    course_id: '1',
  },
  {
    id: '2',
    title: 'Another Mock Angular Lesson',
    description: 'This is another Angular Lesson',
    course_id: '1',
  },
  {
    id: '3',
    title: 'Mock React Lesson',
    description: 'This is a React Lesson',
    course_id: '2',
  },
  {
    id: '4',
    title: 'Another Mock React Lesson',
    description: 'This is another React Lesson',
    course_id: '2',
  },
];

// HELPER: Immutable operations
const create = (collection, obj) => [...collection, obj];
const update = (collection, obj) =>
  collection.map((i) => {
    return i.id === obj.id ? Object.assign({}, obj) : i;
  });
const remove = (collection, obj) => collection.filter((i) => i.id === obj.id);
