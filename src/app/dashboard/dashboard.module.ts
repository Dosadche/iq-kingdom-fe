import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FightsInfoComponent } from './components/fights-info/fights-info.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    LayoutComponent,
    UserInfoCardComponent,
    FightsInfoComponent,
    NavBarComponent,
    UsersComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
