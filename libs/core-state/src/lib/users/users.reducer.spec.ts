import * as UsersActions from "./users.actions";
import { UsersState, initialUsersState, usersReducer } from "./users.reducer";
import { mockUser, mockEmptyUser } from "@bba/testing";

describe("Users Reducer", () => {
  let users;

  beforeEach(() => {
    users = [
      { ...mockUser, id: "0" },
      { ...mockUser, id: "1" },
      { ...mockUser, id: "2" },
    ];
  });

  describe("valid Users actions", () => {
    it("loadUsers should set loaded to false", () => {
      const action = UsersActions.loadUsers();

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadUsersSuccess should return set the list of known Users", () => {
      const action = UsersActions.loadUsersSuccess({ users });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(users.length);
    });

    it("loadUsersFailure should set error to error", () => {
      const action = UsersActions.loadUsersFailure({ error: "error" });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.error).toBe("error");
    });

    it("loadUser should set loaded to false", () => {
      const action = UsersActions.loadUser({ userId: mockUser.id });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it("loadUserSuccess should set loaded to true", () => {
      const action = UsersActions.loadUserSuccess({ user: mockUser });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
    });

    it("loadUserFailure should set error to error", () => {
      const action = UsersActions.loadUserFailure({ error: "error" });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.error).toBe("error");
    });

    it("updateUserSuccess should modify user", () => {
      const prepAction = UsersActions.loadUserSuccess({
        user: { ...mockEmptyUser, id: mockUser.id },
      });
      const prepState: UsersState = usersReducer(initialUsersState, prepAction);

      const action = UsersActions.updateUserSuccess({ user: mockUser });
      const result: UsersState = usersReducer(prepState, action);

      expect(result.ids.length).toBe(1);
      expect(result.entities[0]).toStrictEqual(mockUser);
    });

    it("updateUserFailure should set error to error", () => {
      const action = UsersActions.updateUserFailure({ error: "error" });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.error).toBe("error");
    });

    it("createUserSuccess should add user", () => {
      const action = UsersActions.createUserSuccess({ user: mockUser });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.ids.length).toBe(1);
    });

    it("createUserFailure should set error to error", () => {
      const action = UsersActions.createUserFailure({ error: "error" });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.error).toBe("error");
    });

    it("deleteUserSuccess should add user", () => {
      const prepAction = UsersActions.loadUserSuccess({ user: mockUser });
      const prepState: UsersState = usersReducer(initialUsersState, prepAction);

      const action = UsersActions.deleteUserSuccess({ user: mockUser });
      const result: UsersState = usersReducer(prepState, action);

      expect(result.ids.length).toBe(0);
    });

    it("deleteUserFailure should set error to error", () => {
      const action = UsersActions.deleteUserFailure({ error: "error" });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.error).toBe("error");
    });

    it("selectUser should set selectedId", () => {
      const action = UsersActions.selectUser({ selectedId: mockUser.id });

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.selectedId).toBe(mockUser.id);
    });

    it("resetSelectedUser should reset selectedId", () => {
      const action = UsersActions.resetSelectedUser();

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result.selectedId).toBe(null);
    });

    it("resetUsers should reset user state", () => {
      const prepAction = UsersActions.loadUsersSuccess({ users });
      const newState: UsersState = usersReducer(initialUsersState, prepAction);

      const action = UsersActions.resetUsers();
      const result: UsersState = usersReducer(newState, action);

      expect(result.ids.length).toBe(0);
    });
  });

  describe("unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result: UsersState = usersReducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
    });
  });
});
