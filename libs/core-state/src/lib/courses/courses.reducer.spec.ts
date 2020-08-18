import * as CoursesActions from "./courses.actions";
import { CoursesState, initialCoursesState, coursesReducer } from "./courses.reducer";
import { mockCourse, mockEmptyCourse } from "@bba/testing";

describe("Courses Reducer", () => {
  let courses;

  beforeEach(() => {
    courses = [
      { ...mockCourse, id: "0" },
      { ...mockCourse, id: "1" },
      { ...mockCourse, id: "2" },
    ];
  });

  describe("valid Courses actions", () => {
    it("loadCourses should set loaded to false", () => {
      const action = CoursesActions.loadCourses();

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadCoursesSuccess should return set the list of known Courses", () => {
      const action = CoursesActions.loadCoursesSuccess({ courses });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(courses.length);
    });

    it("loadCoursesFailure should set error to error", () => {
      const action = CoursesActions.loadCoursesFailure({ error: "error" });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.error).toBe("error");
    });

    it("loadCourse should set loaded to false", () => {
      const action = CoursesActions.loadCourse({ courseId: mockCourse.id });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadCourseSuccess should set loaded to true", () => {
      const action = CoursesActions.loadCourseSuccess({ course: mockCourse });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
    });

    it("loadCourseFailure should set error to error", () => {
      const action = CoursesActions.loadCourseFailure({ error: "error" });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.error).toBe("error");
    });

    it("updateCourseSuccess should modify course", () => {
      const prepAction = CoursesActions.loadCourseSuccess({
        course: { ...mockEmptyCourse, id: mockCourse.id },
      });
      const prepState: CoursesState = coursesReducer(initialCoursesState, prepAction);

      const action = CoursesActions.updateCourseSuccess({ course: mockCourse });
      const result: CoursesState = coursesReducer(prepState, action);

      expect(result.ids.length).toBe(1);
      expect(result.entities[0]).toStrictEqual(mockCourse);
    });

    it("updateCourseFailure should set error to error", () => {
      const action = CoursesActions.updateCourseFailure({ error: "error" });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.error).toBe("error");
    });

    it("createCourseSuccess should add course", () => {
      const action = CoursesActions.createCourseSuccess({ course: mockCourse });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.ids.length).toBe(1);
    });

    it("createCourseFailure should set error to error", () => {
      const action = CoursesActions.createCourseFailure({ error: "error" });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.error).toBe("error");
    });

    it("deleteCourseSuccess should add course", () => {
      const prepAction = CoursesActions.loadCourseSuccess({ course: mockCourse });
      const prepState: CoursesState = coursesReducer(initialCoursesState, prepAction);

      const action = CoursesActions.deleteCourseSuccess({ course: mockCourse });
      const result: CoursesState = coursesReducer(prepState, action);

      expect(result.ids.length).toBe(0);
    });

    it("deleteCourseFailure should set error to error", () => {
      const action = CoursesActions.deleteCourseFailure({ error: "error" });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.error).toBe("error");
    });

    it("selectCourse should set selectedId", () => {
      const action = CoursesActions.selectCourse({ selectedId: mockCourse.id });

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.selectedId).toBe(mockCourse.id);
    });

    it("resetSelectedCourse should reset selectedId", () => {
      const action = CoursesActions.resetSelectedCourse();

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result.selectedId).toBe(null);
    });

    it("resetCourses should reset course state", () => {
      const prepAction = CoursesActions.loadCoursesSuccess({ courses });
      const newState: CoursesState = coursesReducer(initialCoursesState, prepAction);

      const action = CoursesActions.resetCourses();
      const result: CoursesState = coursesReducer(newState, action);

      expect(result.ids.length).toBe(0);
    });
  });

  describe("unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result: CoursesState = coursesReducer(initialCoursesState, action);

      expect(result).toBe(initialCoursesState);
    });
  });
});
