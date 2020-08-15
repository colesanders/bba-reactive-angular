import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MaterialModule } from '@bba/material';
import { LessonsListComponent } from '../lessons/lessons-list/lessons-list.component';
import { CoursesFacade, LessonsFacade } from '@bba/core-state';
import { mockCoursesFacade, mockLessonsFacade } from '../tests.mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        LessonsListComponent,
      ],
      imports: [
        MaterialModule,
      ],
      providers: [
        { provide: CoursesFacade, useValue: mockCoursesFacade },
        { provide: LessonsFacade, useValue: mockLessonsFacade },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
