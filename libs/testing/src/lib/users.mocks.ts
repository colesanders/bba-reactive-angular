import { User } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockUsersFacade = {
  loadUsers: () => {},
  selectUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  createUser: () => {},
  mutations$: of(true),
};

export const mockUsersService = {
  all: () => of([]),
  find: () => of({ ...mockUser }),
  create: () => of({ ...mockUser }),
  update: () => of({ ...mockUser }),
  delete: () => of({ ...mockUser }),
};

export const mockUser: User = {
  id: '0',
  title: 'mockUser',
  firstName: 'Mock',
  lastName: 'User',
  email: 'mockUser@mock.com',
  password: '12345',
};
export const mockEmptyUser: User = {
  id: null,
  title: 'mockEmptyUser',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
