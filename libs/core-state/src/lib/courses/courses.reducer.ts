import { Course } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

export const COURSES_FEATURE_KEY = 'courses';
