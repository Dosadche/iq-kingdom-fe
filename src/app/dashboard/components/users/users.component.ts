import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/core/models/user.model';
import * as usersActions from '../../state/users/user.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/users/user.reducer';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscribeOnStore();
  }

  private getUsers(): void {
    this.store.dispatch(new usersActions.LoadUsers());
  }

  private subscribeOnStore(): void {
    this.store.pipe(untilDestroyed(this))
      .subscribe((state: Partial<AppState>) => {
        this.users = state.users!!.users;
      });
  }
}
