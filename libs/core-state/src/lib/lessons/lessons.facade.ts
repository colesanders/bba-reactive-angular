import { Injectable } from '@angular/core';
import { Lesson } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as LessonsActions from './lessons.actions';
import * as fromLessons from './lessons.reducer';
import * as LessonsSelectors from './lessons.selectors';

@Injectable({
  providedIn: 'root',
})
export class LessonsFacade {
  selectedLesson$ = this.store.pipe(select(LessonsSelectors.getSelectedLesson));
  allLessons$ = this.store.pipe(select(LessonsSelectors.getAllLessons));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
      action.type === LessonsActions.createLesson({} as any).type ||
      action.type === LessonsActions.updateLesson({} as any).type ||
      action.type === LessonsActions.deleteLesson({} as any).type
    )
  );

  constructor(
    private store: Store<fromLessons.LessonsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectLesson(lesson: Lesson) {
    this.dispatch(LessonsActions.selectLesson({ selectedId: lesson?.id }));
  }

  loadLessons() {
    this.dispatch(LessonsActions.loadLessons());
  }

  createLesson(lesson: Lesson) {
    this.dispatch(LessonsActions.createLesson({ lesson }));
  }

  updateLesson(lesson: Lesson) {
    this.dispatch(LessonsActions.updateLesson({ lesson }));
  }

  deleteLesson(lesson: Lesson) {
    this.dispatch(LessonsActions.deleteLesson({ lesson }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
