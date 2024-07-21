import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent {
  @Output() onLogout = new EventEmitter<void>();
  @Output() onRevive = new EventEmitter<void>();
  @Input() user!: User | null;
  constructor() { }

  get isRevivalAble(): boolean {
    if (!this.user) return false;
    if (!this.user.lastRevival) return true;
    const timeSinceLastRevival = 
      Math.abs(new Date().getMilliseconds() - new Date(this.user.lastRevival).getMilliseconds()) 
        / (1000 * 60 * 60);
    return timeSinceLastRevival >= 24;
  }

  handleRevivalClick(): void {
    this.onRevive.emit();
  }

  handleLogout(): void {
    this.onLogout.emit();
  }
}
