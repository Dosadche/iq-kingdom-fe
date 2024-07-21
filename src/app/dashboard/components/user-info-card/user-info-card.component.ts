import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {
  @Output() onLogout = new EventEmitter<void>();
  @Input() user!: User | null;
  constructor() { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.onLogout.emit();
  }
}
