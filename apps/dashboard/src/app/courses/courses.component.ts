import { Component, OnInit } from '@angular/core';
import { Course } from '@bba/api-interfaces';
import { CoursesFacade } from '@bba/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'bba-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  allCourses$: Observable<Course[]> = this.coursesFacade.allCourses$;
  selectedCourse$: Observable<Course> = this.coursesFacade.selectedCourses$;

  constructor(private coursesFacade: CoursesFacade) {}

  ngOnInit(): void {
    this.reset();
    this.coursesFacade.mutations$.subscribe((_) => this.reset())
  }

  reset() {
    this.loadCourses();
    this.selectCourse(null);
  }

  selectCourse(course: Course) {
    this.coursesFacade.selectCourse(course);
  }

  loadCourses() {
    this.coursesFacade.loadCourses();
  }

  saveCourse(course: Course) {
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.createCourse(course);
    }
  }

  createCourse(course: Course) {
    this.coursesFacade.createCourse(course);
  }

  updateCourse(course: Course) {
    this.coursesFacade.updateCourse(course);
  }

  deleteCourse(course: Course) {
    this.coursesFacade.deleteCourse(course);
  }
}
