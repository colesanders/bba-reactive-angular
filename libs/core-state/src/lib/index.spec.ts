import { mockLesson, mockCourse } from "./tests.mocks";
import { getCourseLessons } from '.';

describe('Index Common Selector', () => {
    let lessons, courses;

    beforeEach(() => {
        lessons = [
            {...mockLesson, id: '0'},
            {...mockLesson, id: '1'},
            {...mockLesson, id: '2'},
        ]
        courses = [
            {...mockCourse, id: '0'},
            {...mockCourse, id: '1'},
            {...mockCourse, id: '2'},
        ]
    })


    it('should select the related courses and lessons', () => {
        expect(getCourseLessons.projector(courses, lessons)).toMatchSnapshot();
    })
})