import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'vendor-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <vendor-navigation></vendor-navigation>
    <main class="vendor-main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .vendor-main-content {
      flex: 1;
      background: #f5f5f5;
    }
  `],
})
export class AppComponent {}

