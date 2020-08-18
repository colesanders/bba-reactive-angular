import { Course } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockCoursesFacade = {
  loadCourses: () => {},
  selectCourse: () => {},
  deleteCourse: () => {},
  updateCourse: () => {},
  createCourse: () => {},
  mutations$: of(true),
};

export const mockCoursesService = {
  all: () => of([]),
  find: () => of({ ...mockCourse }),
  create: () => of({ ...mockCourse }),
  update: () => of({ ...mockCourse }),
  delete: () => of({ ...mockCourse }),
};

export const mockCourse: Course = {
  id: '0',
  title: 'mockCourse',
  description: 'mockCourse constant for testing',
};
export const mockEmptyCourse: Course = {
  id: null,
  title: 'mockEmptyCourse',
  description: 'mockEmptyCourse constant for testing',
};
