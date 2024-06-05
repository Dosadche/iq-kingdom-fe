import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

const components = [
  CardComponent,
  InputFieldComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components,
  ]
})
export class SharedModule { }
