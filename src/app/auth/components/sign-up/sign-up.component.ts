import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as authActions from '../../state/auth.action';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as fromAuth from '../../state/auth.reducer';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterSeverity } from 'src/app/shared/models/toaster-message.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { toSignal } from '@angular/core/rxjs-interop';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  isLoading = toSignal(this.store.pipe(select(fromAuth.getAuthLoading)));

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
    this.registerForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private subscribeOnStore(): void {
    this.store.dispatch(new authActions.RemoveData());
    this.store
      .pipe(select(fromAuth.getAuthUser), untilDestroyed(this))
      .subscribe((user: User | null) => {
        if (user) {
          this.navigateToSignIn();
        }
      });
  }
}
