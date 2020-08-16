import * as LessonsActions from './lessons.actions';
import { 
  LessonsState,
  initialLessonsState, 
  lessonsReducer } from './lessons.reducer';
import { Lesson } from '@bba/api-interfaces';

describe('Lessons Reducer', () => {
  const createLesson = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      title: '',
      description: '',
      course_id: '',
    } as Lesson);

  beforeEach(() => {});

  describe('valid Lessons actions', () => {
    it('loadLessonsSuccess should return set the list of known Lessons', () => {
      const lessons = [
        createLesson('PRODUCT-AAA'),
        createLesson('PRODUCT-zzz'),
      ];
      const action = LessonsActions.loadLessonsSuccess({ lessons });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result).toBe(initialLessonsState);
    });
  });
});
