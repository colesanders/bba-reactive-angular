import { Course } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

// HELPER: Initial state
const inititalState = [
  {
    id: '1',
    title: 'Angular Course',
    description: 'This is an Angular course',
  },
  {
    id: '2',
    title: 'React Course',
    description: 'This is a React course',
  },
];

// HELPER: Immutable operations
const create = (collection, obj) => [...collection, obj];
const update = (collection, obj) =>
  collection.map((i) => {
    return i.id === obj.id ? Object.assign({}, obj) : i;
  });
const remove = (collection, obj) => collection.filter((i) => i.id === obj.id);
