import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@bba/api-interfaces';
import { CoursesService } from '@bba/core-data';

@Component({
  selector: 'bba-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  selectedCourse: Course;

  constructor(
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  reset() {
    this.loadCourses();
    this.selectCourse(null);
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }

  loadCourses() { this.courses$ = this.coursesService.all();}

  saveCourse(course: Course) {
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.createCourse(course);
    }
  }

  createCourse(course: Course) {
    this.coursesService.create(course)
      .subscribe(_ => this.reset());
  }

  updateCourse(course: Course) {
    this.coursesService.update(course)
      .subscribe(_ => this.reset());
  }

  deleteCourse(course: Course) {
    this.coursesService.delete(course.id)
      .subscribe(_ => this.reset());
  }
}
