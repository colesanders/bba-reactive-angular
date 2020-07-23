import { Injectable } from '@angular/core';
import { Lesson } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';

import * as LessonsActions from './lessons.actions';
import * as LessonsSelectors from './lessons.selectors';

@Injectable({
  providedIn: 'root'
})
export class LessonsFacade {
  constructor() { }
}
