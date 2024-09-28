import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { UserLogoComponent } from './components/user-logo/user-logo.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalComponent } from './components/fight-modal/fight-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UnreadPipe } from './pipes/unread.pipe';

const components = [
  CardComponent,
  InputFieldComponent,
  UserLogoComponent,
  ModalComponent,
  SpinnerComponent,
  ToasterComponent,
];

const pipes = [TruncatePipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...components, ...pipes],
})
export class SharedModule {}
