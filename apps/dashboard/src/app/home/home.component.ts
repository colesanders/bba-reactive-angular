import { Component, OnInit } from '@angular/core';
import { User } from '@bba/api-interfaces';
import { UsersFacade } from '@bba/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.allUsers$;

  constructor(
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }
}
