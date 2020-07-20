import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LessonsEntity } from './lessons.models';
import { LessonsEffects } from './lessons.effects';
import { LessonsFacade } from './lessons.facade';

import * as LessonsSelectors from './lessons.selectors';
import * as LessonsActions from './lessons.actions';
import {
  LESSONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './lessons.reducer';

interface TestSchema {
  lessons: State;
}

describe('LessonsFacade', () => {
  let facade: LessonsFacade;
  let store: Store<TestSchema>;
  const createLessonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LessonsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LESSONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([LessonsEffects]),
        ],
        providers: [LessonsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(LessonsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLessons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(LessonsActions.loadLessons());

        list = await readFirst(facade.allLessons$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLessonsSuccess` to manually update list
     */
    it('allLessons$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLessons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          LessonsActions.loadLessonsSuccess({
            lessons: [createLessonsEntity('AAA'), createLessonsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allLessons$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
