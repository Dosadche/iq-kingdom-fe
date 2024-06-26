import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { UserLogoComponent } from './components/user-logo/user-logo.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalComponent } from './components/fight-modal/fight-modal.component';

const components = [
  CardComponent,
  InputFieldComponent,
  UserLogoComponent,
  ModalComponent,
]

const pipes = [
  TruncatePipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components,
    ...pipes,
  ]
})
export class SharedModule { }
