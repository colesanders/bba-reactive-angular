import { of } from 'rxjs';
import { environment } from '@env/environment';
import { User, Lesson, Course } from '@bba/api-interfaces';

export class ServiceSpecUrl {
    model

    constructor(model: string){
        this.model = model;
    }

    getUrl() {
        return `${environment.apiEndpoint}${this.model}`;
    }

    getUrlWithId(id) {
        return `${this.getUrl()}/${id}`;
    }
}

export const mockUser: User = {
    id: '0',
    firstName: 'mock',
    lastName: 'user',
    title: 'mock',
    email: 'mockUser@mock.com',
    password: '12345mock'
  }
  export const mockEmptyUser: User = {
    id: null,
    firstName: null,
    lastName: null,
    title: 'mockEmptyUser',
    email: null,
    password: null
  }
  
  export const mockLesson: Lesson = {
    id: '0',
    title: 'mockLesson',
    description: 'mockLesson constant for testing',
    course_id: '0'
  }
  export const mockEmptyLesson: Lesson = {
    id: null,
    title: 'mockEmptyLesson',
    description: 'mockEmptyLesson constant for testing',
    course_id: '0'
  }
  
  export const mockCourse: Course = {
    id: '0',
    title: 'mockCourse',
    description: 'mockCourse constant for testing'
  }
  export const mockEmptyCourse: Course = {
    id: null,
    title: 'mockEmptyCourse',
    description: 'mockEmptyCourse constant for testing'
  }