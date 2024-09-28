import {
  Component,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromAuth from '../../state/auth.reducer';
import * as authActions from '../../state/auth.action';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  StorageKeys,
  StorageService,
} from 'src/app/core/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterSeverity } from 'src/app/shared/models/toaster-message.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { toSignal } from '@angular/core/rxjs-interop';

type SignInForm = FormGroup<{
  email: FormControl<string>,
  password: FormControl<string>,
}>;

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
})
export class SignInComponent implements OnInit {
  signInForm!: SignInForm;
  isLoading = toSignal(this.store.pipe(select(fromAuth.getAuthLoading)));

  constructor(
    private store: Store<fromAuth.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.removeUserFromStorage();
    this.initForm();
    this.subscribeOnStore();
  }

  handleLogin(): void {
    if (this.signInForm.invalid) {
      this.toasterService.toaster = {
        severity: ToasterSeverity.Error,
        message: 'Please ensure all fields are filled correctly',
      };
      this.signInForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(new authActions.Login(this.signInForm.value));
  }

  handleSignUp(): void {
    this.router.navigate(['../sign-up'], { relativeTo: this.route });
  }

  private removeUserFromStorage(): void {
    this.storageService.removeItem(StorageKeys.User);
  }

  private initForm(): void {
    this.signInForm = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private subscribeOnStore(): void {
    this.store
      .pipe(select(fromAuth.getIsSignedIn), untilDestroyed(this))
      .subscribe((isSignedIn: boolean) => {
        if (isSignedIn) {
          this.toasterService.toaster = {
            severity: ToasterSeverity.Success,
            message: 'Logged In Successfully',
          };
          this.navigateToDashboard();
        }
      });
  }

  private navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
