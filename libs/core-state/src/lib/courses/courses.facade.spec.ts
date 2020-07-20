import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CoursesEntity } from './courses.models';
import { CoursesEffects } from './courses.effects';
import { CoursesFacade } from './courses.facade';

import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';
import {
  COURSES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './courses.reducer';

interface TestSchema {
  courses: State;
}

describe('CoursesFacade', () => {
  let facade: CoursesFacade;
  let store: Store<TestSchema>;
  const createCoursesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CoursesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COURSES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CoursesEffects]),
        ],
        providers: [CoursesFacade],
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
      facade = TestBed.get(CoursesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCourses$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CoursesActions.loadCourses());

        list = await readFirst(facade.allCourses$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCoursesSuccess` to manually update list
     */
    it('allCourses$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCourses$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CoursesActions.loadCoursesSuccess({
            courses: [createCoursesEntity('AAA'), createCoursesEntity('BBB')],
          })
        );

        list = await readFirst(facade.allCourses$);
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
