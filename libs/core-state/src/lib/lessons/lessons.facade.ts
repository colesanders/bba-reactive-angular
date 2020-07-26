import { Injectable } from '@angular/core';
import { Lesson } from '@bba/api-interfaces';
import { LessonsService } from '@bba/core-data';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as fromLessons from './lessons.reducer';

import * as LessonsActions from './lessons.actions';
import * as LessonsSelectors from './lessons.selectors';

@Injectable({
  providedIn: 'root',
})
export class LessonsFacade {
  private selectedLesson = new Subject<Lesson>();
  private mutations = new Subject();

  selectedLessons$ = this.selectedLesson.asObservable();
  mutations$ = this.mutations.asObservable();
  allLessons$ = this.store.pipe(
    select('lessons'),
    map((state) => state.lessons)
  );

  constructor(
    private lessonsService: LessonsService,
    private store: Store<fromLessons.LessonsPartialState>
  ) {}

  reset() {
    this.mutations.next(true);
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson.next(lesson);
  }

  loadLessons() {
    this.lessonsService
      .all()
      .subscribe((lessons: Lesson[]) =>
        this.store.dispatch({ type: 'setAllLessons', lessons })
      );
  }

  createLesson(lesson: Lesson) {
    this.store.dispatch({ type: 'createLesson', lesson });
  }

  updateLesson(lesson: Lesson) {
    this.store.dispatch({ type: 'updateLesson', lesson });
  }

  deleteLesson(lesson: Lesson) {
    this.store.dispatch({ type: 'deleteLesson', lesson });
  }
}
