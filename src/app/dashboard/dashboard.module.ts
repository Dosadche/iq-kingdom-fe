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
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './state/users/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './state/users/user.effect';
import { authReducer } from '../auth/state/auth.reducer';
import { AuthEffect } from '../auth/state/auth.effect';
import { questionReducer } from './state/questions/question.reducer';
import { QuestionEffect } from './state/questions/question.effect';


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
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature(UserEffect),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(AuthEffect),
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature(QuestionEffect),
  ]
})
export class DashboardModule { }
