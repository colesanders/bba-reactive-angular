import { Lesson } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockLessonsFacade = {
  loadLessons: () => {},
  selectLesson: () => {},
  deleteLesson: () => {},
  updateLesson: () => {},
  createLesson: () => {},
  mutations$: of(true),
};

export const mockLessonsService = {
  all: () => of([]),
  find: () => of({ ...mockLesson }),
  create: () => of({ ...mockLesson }),
  update: () => of({ ...mockLesson }),
  delete: () => of({ ...mockLesson }),
};

export const mockLesson: Lesson = {
  id: '0',
  title: 'mockLesson',
  description: 'mockLesson constant for testing',
  course_id: '0',
};
export const mockEmptyLesson: Lesson = {
  id: null,
  title: 'mockEmptyLesson',
  description: 'mockEmptyLesson constant for testing',
  course_id: '0',
};
