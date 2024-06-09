import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UserInfoCardComponent } from './user-info-card/user-info-card.component';
import { SharedModule } from '../shared/shared.module';
import { FightsInfoComponent } from './fights-info/fights-info.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    UserInfoCardComponent,
    FightsInfoComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
