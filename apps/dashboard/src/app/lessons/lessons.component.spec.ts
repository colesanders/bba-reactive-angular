import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { MaterialModule } from '@bba/material';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LessonsFacade } from '@bba/core-state';
import { mockLessonsFacade, mockLesson, mockEmptyLesson } from '../tests.mocks';
import { DebugElement } from '@angular/core';

describe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;
  let de: DebugElement;
  let lessonsFacade: LessonsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LessonsComponent,
        LessonsListComponent,
        LessonDetailsComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: LessonsFacade, useValue: mockLessonsFacade}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    lessonsFacade = de.injector.get(LessonsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call lessonsFacade selectLesson', () => {
    const spy = jest.spyOn(lessonsFacade, 'selectLesson');

    component.selectLesson(mockLesson);

    expect(spy).toHaveBeenCalled();
  })

  describe('should on save call lessonsFacade', () => {
    it('updateLesson', () => {
      const spy = jest.spyOn(lessonsFacade, 'updateLesson');

      component.saveLesson(mockLesson);

      expect(spy).toHaveBeenCalled();
    })

    it('createLesson', () => {
      const spy = jest.spyOn(lessonsFacade, 'createLesson');

      component.saveLesson(mockEmptyLesson);

      expect(spy).toHaveBeenCalled();
    })
  })

  it('should on delete call lessonsFacade deleteLesson', () => {
    const spy = jest.spyOn(lessonsFacade, 'deleteLesson');

    component.deleteLesson(mockLesson);

    expect(spy).toHaveBeenCalled();
  })
});
