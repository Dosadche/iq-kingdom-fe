import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.scss']
})
export class UserLogoComponent implements OnInit {
  @Input() name!: string;
  @Input() color: 'blue' | 'green' | 'purple' = 'blue';

  constructor() { }

  ngOnInit(): void {
  }

  get letters(): string {
    return this.name.split(' ').map((partOfName: string) => partOfName[0]).join('');
  }
}
