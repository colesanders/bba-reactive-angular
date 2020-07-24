import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '@bba/api-interfaces';

@Component({
  selector: 'bba-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent {
  currentLesson: Lesson;
  originalTitle = '';
  @Input() set lesson(value: Lesson) {
    if(value) this.originalTitle = value.title;
    this.currentLesson = Object.assign({}, value);
  };
  @Output() saved = new EventEmitter;
  @Output() cancelled = new EventEmitter;
}
