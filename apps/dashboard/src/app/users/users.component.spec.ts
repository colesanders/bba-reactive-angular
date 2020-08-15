import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { MaterialModule } from '@bba/material';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { UsersFacade } from '@bba/core-state';
import { mockUsersFacade, mockUser, mockEmptyUser } from '../tests.mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let de: DebugElement;
  let usersFacade: UsersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UsersComponent,
        UsersListComponent,
        UserDetailsComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: UsersFacade, useValue: mockUsersFacade}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    usersFacade = de.injector.get(UsersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call usersFacade selectUser', () => {
    const spy = jest.spyOn(usersFacade, 'selectUser');

    component.selectUser(mockUser);

    expect(spy).toHaveBeenCalled();
  })

  describe('should on save call usersFacade', () => {
    it('updateUser', () => {
      const spy = jest.spyOn(usersFacade, 'updateUser');

      component.saveUser(mockUser);

      expect(spy).toHaveBeenCalled();
    })

    it('createUser', () => {
      const spy = jest.spyOn(usersFacade, 'createUser');

      component.saveUser(mockEmptyUser);

      expect(spy).toHaveBeenCalled();
    })
  })

  it('should on delete call usersFacade deleteUser', () => {
    const spy = jest.spyOn(usersFacade, 'deleteUser');

    component.deleteUser(mockUser);

    expect(spy).toHaveBeenCalled();
  })
});
