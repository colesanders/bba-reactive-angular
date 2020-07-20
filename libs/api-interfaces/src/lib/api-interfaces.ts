export interface Message {
  message: string;
}

export interface Course {
  id: string,
  title: string,
  description: string,
}

export interface Lesson {
  id: string,
  title: string,
  description: string,
  course_id: string,
}

export interface User {
  id: string,
  title: string;
  firstName: string;
  lastName: string;
  email: string,
  password: string,
}

export interface Login {
  email: string;
  password: string;
}
