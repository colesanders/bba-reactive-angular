import * as LessonsActions from "./lessons.actions";
import { LessonsState, initialLessonsState, lessonsReducer } from "./lessons.reducer";
import { mockLesson, mockEmptyLesson } from "@bba/testing";

describe("Lessons Reducer", () => {
  let lessons;

  beforeEach(() => {
    lessons = [
      { ...mockLesson, id: "0" },
      { ...mockLesson, id: "1" },
      { ...mockLesson, id: "2" },
    ];
  });

  describe("valid Lessons actions", () => {
    it("loadLessons should set loaded to false", () => {
      const action = LessonsActions.loadLessons();

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadLessonsSuccess should return set the list of known Lessons", () => {
      const action = LessonsActions.loadLessonsSuccess({ lessons });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(lessons.length);
    });

    it("loadLessonsFailure should set error to error", () => {
      const action = LessonsActions.loadLessonsFailure({ error: "error" });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.error).toBe("error");
    });

    it("loadLesson should set loaded to false", () => {
      const action = LessonsActions.loadLesson({ lessonId: mockLesson.id });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadLessonSuccess should set loaded to true", () => {
      const action = LessonsActions.loadLessonSuccess({ lesson: mockLesson });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
    });

    it("loadLessonFailure should set error to error", () => {
      const action = LessonsActions.loadLessonFailure({ error: "error" });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.error).toBe("error");
    });

    it("updateLessonSuccess should modify lesson", () => {
      const prepAction = LessonsActions.loadLessonSuccess({
        lesson: { ...mockEmptyLesson, id: mockLesson.id },
      });
      const prepState: LessonsState = lessonsReducer(initialLessonsState, prepAction);

      const action = LessonsActions.updateLessonSuccess({ lesson: mockLesson });
      const result: LessonsState = lessonsReducer(prepState, action);

      expect(result.ids.length).toBe(1);
      expect(result.entities[0]).toStrictEqual(mockLesson);
    });

    it("updateLessonFailure should set error to error", () => {
      const action = LessonsActions.updateLessonFailure({ error: "error" });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.error).toBe("error");
    });

    it("createLessonSuccess should add lesson", () => {
      const action = LessonsActions.createLessonSuccess({ lesson: mockLesson });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.ids.length).toBe(1);
    });

    it("createLessonFailure should set error to error", () => {
      const action = LessonsActions.createLessonFailure({ error: "error" });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.error).toBe("error");
    });

    it("deleteLessonSuccess should add lesson", () => {
      const prepAction = LessonsActions.loadLessonSuccess({ lesson: mockLesson });
      const prepState: LessonsState = lessonsReducer(initialLessonsState, prepAction);

      const action = LessonsActions.deleteLessonSuccess({ lesson: mockLesson });
      const result: LessonsState = lessonsReducer(prepState, action);

      expect(result.ids.length).toBe(0);
    });

    it("deleteLessonFailure should set error to error", () => {
      const action = LessonsActions.deleteLessonFailure({ error: "error" });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.error).toBe("error");
    });

    it("selectLesson should set selectedId", () => {
      const action = LessonsActions.selectLesson({ selectedId: mockLesson.id });

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.selectedId).toBe(mockLesson.id);
    });

    it("resetSelectedLesson should reset selectedId", () => {
      const action = LessonsActions.resetSelectedLesson();

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result.selectedId).toBe(null);
    });

    it("resetLessons should reset lesson state", () => {
      const prepAction = LessonsActions.loadLessonsSuccess({ lessons });
      const newState: LessonsState = lessonsReducer(initialLessonsState, prepAction);

      const action = LessonsActions.resetLessons();
      const result: LessonsState = lessonsReducer(newState, action);

      expect(result.ids.length).toBe(0);
    });
  });

  describe("unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result: LessonsState = lessonsReducer(initialLessonsState, action);

      expect(result).toBe(initialLessonsState);
    });
  });
});
