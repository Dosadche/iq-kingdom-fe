import { Component } from '@angular/core';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [SharedModule, RouterModule],
})
export class AppComponent {
  title = 'iq-kingdom-fe';
}
