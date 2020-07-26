import { Course } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

export const COURSES_FEATURE_KEY = 'courses';

// HELPER: Initial state
const inititalCourses = [
  {
    id: '1',
    title: 'Mock Angular Course',
    description: 'This is an Angular Course',
  },
  {
    id: '2',
    title: 'Another Mock Angular Course',
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
