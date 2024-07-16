import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() isPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
