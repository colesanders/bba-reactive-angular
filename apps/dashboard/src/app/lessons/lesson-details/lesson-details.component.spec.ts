import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailsComponent } from './lesson-details.component';
import { MaterialModule } from '@bba/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { mockLesson } from '../../tests.mocks';

describe('LessonDetailsComponent', () => {
  let component: LessonDetailsComponent;
  let fixture: ComponentFixture<LessonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDetailsComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDetailsComponent);
    component = fixture.componentInstance;
    component.lesson = mockLesson;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
