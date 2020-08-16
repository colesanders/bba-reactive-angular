import * as CoursesActions from './courses.actions';
import { 
  CoursesState,
  initialCoursesState, 
  coursesReducer } from './courses.reducer';
import { Course } from '@bba/api-interfaces';

describe('Courses Reducer', () => {
  const createCourse = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      title: '',
      description: '',
    } as Course);

  beforeEach(() => {});

  describe('valid Courses actions', () => {
    it('loadCoursesSuccess should return set the list of known Courses', () => {
      const courses = [
        createCourse('PRODUCT-AAA'),
        createCourse('PRODUCT-zzz'),
      ];
      const action = CoursesActions.loadCoursesSuccess({ courses });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result).toBe(initialCoursesState);
    });
  });
});
