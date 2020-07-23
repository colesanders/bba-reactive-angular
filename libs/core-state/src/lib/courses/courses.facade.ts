import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
  providedIn: 'root'
})
export class CoursesFacade {

}
