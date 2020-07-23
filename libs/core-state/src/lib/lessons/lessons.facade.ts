import { Injectable } from '@angular/core';
import { Lesson } from '@bba/api-interfaces';
import { LessonsService } from '@bba/core-data';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as LessonsActions from './lessons.actions';
import * as LessonsSelectors from './lessons.selectors';

@Injectable({
  providedIn: 'root',
})
export class LessonsFacade {
  private allLessons = new Subject<Lesson[]>();
  private selectedLesson = new Subject<Lesson>();
  private mutations = new Subject();

  allLessons$ = this.allLessons.asObservable();
  selectedLessons$ = this.selectedLesson.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(private lessonsService: LessonsService) {}

  reset() {
    this.mutations.next(true);
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson.next(lesson);
  }

  loadLessons() {
    this.lessonsService
      .all()
      .subscribe((lessons: Lesson[]) => this.allLessons.next(lessons));
  }

  // 04: Remaining CRUD functions
  saveLesson(lesson: Lesson) {
    if (lesson.id) {
      this.updateLesson(lesson);
    } else {
      this.createLesson(lesson);
    }
  }

  createLesson(lesson: Lesson) {
    this.lessonsService.create(lesson).subscribe((_) => this.reset());
  }

  updateLesson(lesson: Lesson) {
    this.lessonsService.update(lesson).subscribe((_) => this.reset());
  }

  deleteLesson(lesson: Lesson) {
    this.lessonsService.delete(lesson.id).subscribe((_) => this.reset());
  }
}
