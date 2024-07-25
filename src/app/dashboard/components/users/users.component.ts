import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/shared/models/user.model';
import * as usersActions from '../../state/users/user.action';
import { select, Store } from '@ngrx/store';
import * as fromUsers from '../../state/users/user.reducer';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { ModalComponent } from 'src/app/shared/components/fight-modal/fight-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('fightModal') fightModal!: ModalComponent;
  users!: Observable<User[]>;
  isLoading!: Observable<boolean>;
  currentUser!: User | null;

  constructor(private store: Store<fromUsers.AppState>,
              private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscribeOnStore();
  }

  handleStartFight(userId: string): void {
    const approve = this.confirmationService.confirm('Do you realy want to attack this user?');
    if (approve) {
      this.fightModal.startAttack(userId);
    }
  }

  private getUsers(): void {
    this.store.dispatch(new usersActions.LoadUsers());
  }

  private subscribeOnStore(): void {
    this.isLoading = this.store.pipe(select(fromUsers.getUsersLoading));
    this.users = this.store.pipe(select(fromUsers.getUsers));
    this.store
      .pipe(
        select(fromUsers.getUser), 
        untilDestroyed(this))
      .subscribe((user: User | null) => this.currentUser = user);
  }
}
