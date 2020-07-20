import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '@bba/api-interfaces';
import { LessonsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]> = this.lessonsFacade.allLessons$;
  selectedLesson$ = this.lessonsFacade.selectedLesson$;

  constructor(
    private lessonsFacade: LessonsFacade
  ) { }

  ngOnInit(): void {
    this.loadLessons();
    this.lessonsFacade.mutations$.subscribe(_ => this.reset());
  }

  reset() {
    this.loadLessons();
    this.lessonsFacade.selectLesson(null);
  }

  loadLessons() {
    this.lessonsFacade.loadLessons();
  }

  selectLesson(lesson: Lesson) {
    this.lessonsFacade.selectLesson(lesson.id);
  }

  saveLesson(lesson: Lesson) {
    if (lesson.id) {
      this.lessonsFacade.updateLesson(lesson);
    } else {
      this.lessonsFacade.createLesson(lesson);
    }
  }

  deleteLesson(lesson: Lesson) {
    this.lessonsFacade.deleteLesson(lesson);
  }
}
