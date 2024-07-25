import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../state/auth.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromAuth from '../../state/auth.reducer';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterSeverity } from 'src/app/shared/models/toaster-message.model';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading!: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.AppState>,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeOnStore();
  }

  handleRegister(): void {
    if (this.registerForm.invalid) {
      this.toasterService.toaster = {
        severity: ToasterSeverity.Error,
        message: 'Please, ensure all fields are filled correctly',
      };
      this.registerForm.markAllAsTouched();
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private subscribeOnStore(): void {
    this.store.dispatch(new authActions.RemoveData());
    this.isLoading = this.store.pipe(select(fromAuth.getAuthLoading));
    this.store
      .pipe(select(fromAuth.getAuthUser), untilDestroyed(this))
      .subscribe((user: User | null) => {
        if (user) {
          this.navigateToSignIn();
        }
      });
  }
}
