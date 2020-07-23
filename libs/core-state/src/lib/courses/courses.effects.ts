import { Injectable } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { CoursesService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
