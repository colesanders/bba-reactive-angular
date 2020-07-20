import { LessonsEntity } from './lessons.models';
import * as LessonsActions from './lessons.actions';
import { State, initialState, reducer } from './lessons.reducer';

describe('Lessons Reducer', () => {
  const createLessonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LessonsEntity);

  beforeEach(() => {});

  describe('valid Lessons actions', () => {
    it('loadLessonsSuccess should return set the list of known Lessons', () => {
      const lessons = [
        createLessonsEntity('PRODUCT-AAA'),
        createLessonsEntity('PRODUCT-zzz'),
      ];
      const action = LessonsActions.loadLessonsSuccess({ lessons });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
