import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../../auth/state/auth.action';
import * as fromAuth from '../../../auth/state/auth.reducer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Observable, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user!: Observable<User | null>;
  constructor(private store: Store<fromAuth.AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.subscribeOnStore();
  }

  handleLogout(): void {
    this.store.dispatch(new authActions.Logout());
  }

  private subscribeOnStore(): void {
    this.user = this.store
      .pipe(
        select(fromAuth.getAuthUser),
        tap((user: User | null) => {
          if (!user) {
            this.router.navigate(['auth/sign-in']);
          }
        }),
        untilDestroyed(this));
  }
}
