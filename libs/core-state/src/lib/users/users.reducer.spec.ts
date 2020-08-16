import * as UsersActions from './users.actions';
import { 
  UsersState,
  initialUsersState, 
  usersReducer } from './users.reducer';
import { User } from '@bba/api-interfaces';

describe('Users Reducer', () => {
  const createUser = (id: string, name = '') =>
    ({
      id,
      firstName: name || `name-${id}`,
      lastName: '',
      email: '',
      password: ''
    } as User);

  beforeEach(() => {});

  describe('valid Users actions', () => {
    it('loadUsersSuccess should return set the list of known Users', () => {
      const users = [
        createUser('PRODUCT-AAA'),
        createUser('PRODUCT-zzz'),
      ];
      const action = UsersActions.loadUsersSuccess({ users });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
    });
  });
});
