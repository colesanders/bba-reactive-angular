import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '@bba/api-interfaces';
import { LessonsService } from '@bba/core-data';

@Component({
  selector: 'bba-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  selectedLesson: Lesson;

  constructor(
    private lessonsService: LessonsService
  ) { }

  ngOnInit(): void {
    this.loadLessons();
  }

  reset() {
    this.loadLessons();
    this.selectLesson(null);
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
  }

  loadLessons() { this.lessons$ = this.lessonsService.all();}

  saveLesson(lesson: Lesson) {
    if (lesson.id) {
      this.updateLesson(lesson);
    } else {
      this.createLesson(lesson);
    }
  }

  createLesson(lesson: Lesson) {
    this.lessonsService.create(lesson)
      .subscribe(_ => this.reset());
  }

  updateLesson(lesson: Lesson) {
    this.lessonsService.update(lesson)
      .subscribe(_ => this.reset());
  }

  deleteLesson(lesson: Lesson) {
    this.lessonsService.delete(lesson.id)
      .subscribe(_ => this.reset());
  }
}
