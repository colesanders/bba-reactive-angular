import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { MaterialModule } from '@bba/material';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesFacade } from '@bba/core-state';
import { mockCoursesFacade, mockCourse, mockEmptyCourse } from '../tests.mocks';
import { DebugElement } from '@angular/core';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let de: DebugElement;
  let coursesFacade: CoursesFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CoursesComponent,
        CoursesListComponent,
        CourseDetailsComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesFacade, useValue: mockCoursesFacade },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    coursesFacade = de.injector.get(CoursesFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call coursesFacade selectCourse', () => {
    const spy = jest.spyOn(coursesFacade, 'selectCourse');

    component.selectCourse(mockCourse);

    expect(spy).toHaveBeenCalled();
  })

  describe('should on save call coursesFacade', () => {
    it('updateCourse', () => {
      const spy = jest.spyOn(coursesFacade, 'updateCourse');

      component.saveCourse(mockCourse);

      expect(spy).toHaveBeenCalled();
    })

    it('createCourse', () => {
      // assign
      const spy = jest.spyOn(coursesFacade, 'createCourse');

      // act 
      component.saveCourse(mockEmptyCourse);

      // assert
      expect(spy).toHaveBeenCalled();
    })
  })

  it('should on delete call coursesFacade deleteCourse', () => {
    const spy = jest.spyOn(coursesFacade, 'deleteCourse');

    component.deleteCourse(mockCourse);

    expect(spy).toHaveBeenCalled();
  })
});
