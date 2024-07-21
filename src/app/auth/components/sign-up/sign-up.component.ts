import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../state/auth.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/shared/services/error.service'
import * as fromAuth from '../../state/auth.reducer';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading!: Observable<boolean>;

  constructor(private store: Store<fromAuth.AppState>,
              private formBuilder: FormBuilder,
              private errorService: ErrorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeOnStore();
  }

  handleRegister(): void {
    if (this.registerForm.invalid) {
      this.errorService.error = 'Please, ensure all fields are filled correctly';
      return;
    }
    this.store.dispatch(new authActions.Authenticate(this.registerForm.value));
  }

  navigateToSignIn(): void {
    this.router.navigate(['../sign-in'], { relativeTo: this.route });
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private subscribeOnStore(): void {
    this.isLoading = this.store.pipe(select(fromAuth.getAuthLoading));
    this.store
      .pipe(
        select(fromAuth.getAuthUser),
        untilDestroyed(this))
      .subscribe((user: User | null) => {
        if (user) {
          this.navigateToSignIn();
        }
      });
  }
}
