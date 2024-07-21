import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import * as fromAuth from '../../state/auth.reducer';
import * as authActions from '../../state/auth.action';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isLoading!: Observable<boolean>;

  constructor(private store: Store<fromAuth.AppState>,
              private router: Router,
              private fb: FormBuilder,
              private errorService: ErrorService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.removeUserFromStorage();
    this.initForm();
    this.subscribeOnStore();
  }

  handleLogin(): void {
    if (this.signInForm.invalid) {
      this.errorService.error = 'Please ensure all fields are filled correctly';
      return;
    }
    this.store.dispatch(new authActions.Login(this.signInForm.value));
  }

  private removeUserFromStorage(): void {
    this.storageService.removeItem(StorageKeys.User);
  }

  private initForm(): void {
    this.signInForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  private subscribeOnStore(): void {
    this.isLoading = this.store.pipe(select(fromAuth.getAuthLoading));
    this.store
      .pipe(
        select(fromAuth.getIsSignedIn),
        untilDestroyed(this))
      .subscribe((isSignedIn: boolean) => {
        if (isSignedIn) {
          this.navigateToDashboard();
        }
      });
  }

  private navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
