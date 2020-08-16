import { User, Lesson, Course } from '@bba/api-interfaces'
import { of } from 'rxjs'

export const mockLessonsFacade = {
  loadLessons: () => {},
  selectLesson: () => {},
  deleteLesson: () => {},
  updateLesson: () => {},
  createLesson: () => {},
  mutations$: of(true),
}
export const mockLessonsService = {
    all: () => of([]),
    find: () => {},
}
  
export const mockCoursesFacade = {
  loadCourses: () => {},
  selectCourse: () => {},
  deleteCourse: () => {},
  updateCourse: () => {},
  createCourse: () => {},
  mutations$: of(true),
}
export const mockCoursesService = {
    all: () => of([]),
    find: () => of({...mockCourse}),
    create: () => of ({...mockCourse}),
    update: () => of({...mockCourse}),
    delete: () => of({...mockCourse}),
}

export const mockUsersFacade = {
  loadUsers: () => {},
  selectUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  createUser: () => {},
  mutations$: of(true),
}
export const mockUsersService = {
    all: () => of([]),
    find: () => {},
}

export const mockUser: User = {
  id: '0',
  firstName: 'mock',
  lastName: 'user',
  title: 'mock',
  email: 'mockUser@mock.com',
  password: '12345mock'
}
export const mockEmptyUser: User = {
  id: null,
  firstName: null,
  lastName: null,
  title: 'mockEmptyUser',
  email: null,
  password: null
}

export const mockLesson: Lesson = {
  id: '0',
  title: 'mockLesson',
  description: 'mockLesson constant for testing',
  course_id: '0'
}
export const mockEmptyLesson: Lesson = {
  id: null,
  title: 'mockEmptyLesson',
  description: 'mockEmptyLesson constant for testing',
  course_id: '0'
}

export const mockCourse: Course = {
  id: '0',
  title: 'mockCourse',
  description: 'mockCourse constant for testing'
}
export const mockEmptyCourse: Course = {
  id: null,
  title: 'mockEmptyCourse',
  description: 'mockEmptyCourse constant for testing'
}