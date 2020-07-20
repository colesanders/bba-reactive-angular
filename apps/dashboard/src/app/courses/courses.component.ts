import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@bba/api-interfaces';
import { CoursesFacade } from '@bba/core-state';

@Component({
  selector: 'bba-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.coursesFacade.allCourses$;
  selectedCourse$ = this.coursesFacade.selectedCourse$;

  constructor(
    private coursesFacade: CoursesFacade
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.coursesFacade.mutations$.subscribe(_ => this.reset());
  }

  reset() {
    this.loadCourses();
    this.coursesFacade.selectCourse(null);
  }

  loadCourses() {
    this.coursesFacade.loadCourses();
  }

  selectCourse(course: Course) {
    this.coursesFacade.selectCourse(course.id);
  }

  saveCourse(course: Course) {
    if (course.id) {
      this.coursesFacade.updateCourse(course);
    } else {
      this.coursesFacade.createCourse(course);
    }
  }

  deleteCourse(course: Course) {
    this.coursesFacade.deleteCourse(course);
  }
}
