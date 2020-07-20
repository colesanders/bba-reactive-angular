import { LessonsEntity } from './lessons.models';
import { State, lessonsAdapter, initialState } from './lessons.reducer';
import * as LessonsSelectors from './lessons.selectors';

describe('Lessons Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLessonsId = (it) => it['id'];
  const createLessonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LessonsEntity);

  let state;

  beforeEach(() => {
    state = {
      lessons: lessonsAdapter.addAll(
        [
          createLessonsEntity('PRODUCT-AAA'),
          createLessonsEntity('PRODUCT-BBB'),
          createLessonsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Lessons Selectors', () => {
    it('getAllLessons() should return the list of Lessons', () => {
      const results = LessonsSelectors.getAllLessons(state);
      const selId = getLessonsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = LessonsSelectors.getSelected(state);
      const selId = getLessonsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLessonsLoaded() should return the current 'loaded' status", () => {
      const result = LessonsSelectors.getLessonsLoaded(state);

      expect(result).toBe(true);
    });

    it("getLessonsError() should return the current 'error' state", () => {
      const result = LessonsSelectors.getLessonsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
