import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '@bba/api-interfaces';
import { LessonsService } from '@bba/core-data';
import { LessonsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]> = this.lessonsFacade.allLessons$;
  selectedLesson$: Observable<Lesson> = this.lessonsFacade.selectedLessons$;

  constructor(private lessonsFacade: LessonsFacade) {}

  ngOnInit(): void {
    this.reset();
    this.lessonsFacade.mutations$.subscribe((_) => this.reset())
  }

  reset() {
    this.loadLessons();
    this.selectLesson(null);
  }

  selectLesson(lesson: Lesson) {
    this.lessonsFacade.selectLesson(lesson);
  }

  loadLessons() {
    this.lessonsFacade.loadLessons();
  }

  saveLesson(lesson: Lesson) {
    if (lesson.id) {
      this.updateLesson(lesson);
    } else {
      this.createLesson(lesson);
    }
  }

  createLesson(lesson: Lesson) {
    this.lessonsFacade.createLesson(lesson);
  }

  updateLesson(lesson: Lesson) {
    this.lessonsFacade.updateLesson(lesson);
  }

  deleteLesson(lesson: Lesson) {
    this.lessonsFacade.deleteLesson(lesson);
  }
}
