import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';
import * as fromCourses from './courses/courses.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromCourses.COURSES_FEATURE_KEY]: fromCourses.CoursesState;
  [fromUsers.USERS_FEATURE_KEY]: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromCourses.COURSES_FEATURE_KEY]: fromCourses.coursesReducer,
  [fromUsers.USERS_FEATURE_KEY]: fromUsers.usersReducer,
};
