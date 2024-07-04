import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/core/models/user.model';
import * as usersActions from '../../state/users/user.action';
import { select, Store } from '@ngrx/store';
import * as fromUsers from '../../state/users/user.reducer';
import { map, Observable, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: Observable<User[]>;
  isLoading!: Observable<boolean>;

  constructor(private store: Store<fromUsers.AppState>) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscribeOnStore();
  }

  private getUsers(): void {
    this.store.dispatch(new usersActions.LoadUsers());
  }

  private subscribeOnStore(): void {
    this.isLoading = this.store.pipe(select(fromUsers.getUsersLoading));
    this.users = this.store.pipe(select(fromUsers.getUsers));
  }
}
