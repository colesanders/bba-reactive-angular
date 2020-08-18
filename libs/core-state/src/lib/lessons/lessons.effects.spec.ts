import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { LessonsEffects } from './lessons.effects';
import * as LessonsActions from './lessons.actions';
import { LessonsService } from '@bba/core-data';
import { mockLessonsService, mockLesson } from '@bba/testing';

describe('LessonsEffects', () => {
  let actions: Observable<any>;
  let effects: LessonsEffects;
  let service: LessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LessonsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: LessonsService, useValue: mockLessonsService },
      ],
    });

    effects = TestBed.inject(LessonsEffects);
    service = TestBed.inject(LessonsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadLessons$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.loadLessons() });

      const expected = hot('-a-|', {
        a: LessonsActions.loadLessonsSuccess({ lessons: [] }),
      });

      expect(effects.loadLessons$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: LessonsActions.loadLessons() });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'all');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: LessonsActions.loadLessonsFailure({ error }) });

      expect(effects.loadLessons$).toBeObservable(expected);
    });
  });

  describe('loadLesson$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.loadLesson({ lessonId: mockLesson.id }) });

      const expected = hot('-a-|', {
        a: LessonsActions.loadLessonSuccess({ lesson: {...mockLesson} }),
      });

      expect(effects.loadLesson$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: LessonsActions.loadLesson({lessonId: mockLesson.id}) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'find');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: LessonsActions.loadLessonFailure({ error }) });

      expect(effects.loadLesson$).toBeObservable(expected);
    });
  });

  describe('createLesson$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.createLesson({ lesson: mockLesson }) });

      const expected = hot('-a-|', {
        a: LessonsActions.createLessonSuccess({ lesson: {...mockLesson} }),
      });

      expect(effects.createLesson$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: LessonsActions.createLesson({ lesson: mockLesson }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'create');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: LessonsActions.createLessonFailure({ error }) });

      expect(effects.createLesson$).toBeObservable(expected);
    });
  });

  describe('updateLesson$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.updateLesson({ lesson: mockLesson }) });

      const expected = hot('-a-|', {
        a: LessonsActions.updateLessonSuccess({ lesson: {...mockLesson} }),
      });

      expect(effects.updateLesson$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: LessonsActions.updateLesson({ lesson: mockLesson }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'update');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: LessonsActions.updateLessonFailure({ error }) });

      expect(effects.updateLesson$).toBeObservable(expected);
    });
  });

  describe('deleteLesson$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LessonsActions.deleteLesson({ lesson: mockLesson }) });

      const expected = hot('-a-|', {
        a: LessonsActions.deleteLessonSuccess({ lesson: {...mockLesson} }),
      });

      expect(effects.deleteLesson$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a', { a: LessonsActions.deleteLesson({ lesson: mockLesson }) });

      const error = new Error('mockError') as any;
      const response = cold('-#|', {}, error)

      const spy = jest.spyOn(service, 'delete');
      spy.mockReturnValue(response);

      const expected = cold('--b', { b: LessonsActions.deleteLessonFailure({ error }) });

      expect(effects.deleteLesson$).toBeObservable(expected);
    });
  });

});
