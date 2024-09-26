import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './components/users/users.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
