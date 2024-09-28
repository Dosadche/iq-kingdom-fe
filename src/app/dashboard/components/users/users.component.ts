import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/shared/models/user.model';
import * as usersActions from '../../state/users/user.action';
import { select, Store } from '@ngrx/store';
import * as fromUsers from '../../state/users/user.reducer';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { ModalComponent } from 'src/app/shared/components/fight-modal/fight-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { toSignal } from '@angular/core/rxjs-interop';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UsersComponent implements OnInit {
  @ViewChild('fightModal') fightModal!: ModalComponent;
  users = toSignal(this.store.pipe(select(fromUsers.getUsers)));
  isLoading = toSignal(this.store.pipe(select(fromUsers.getUsersLoading)));
  currentUser!: User | null;

  constructor(
    private store: Store<fromUsers.AppState>,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.subscribeOnStore();
  }

  handleStartFight(userId: string): void {
    const approve = this.confirmationService.confirm(
      'Do you realy want to attack this user?'
    );
    if (approve) {
      this.fightModal.startAttack(userId);
    }
  }

  private getUsers(): void {
    this.store.dispatch(new usersActions.LoadUsers());
  }

  private subscribeOnStore(): void {
    this.store
      .pipe(select(fromUsers.getUser), untilDestroyed(this))
      .subscribe((user: User | null) => (this.currentUser = user));
  }
}
