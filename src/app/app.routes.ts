import { Routes } from '@angular/router';
import { FranchisesComponent } from './pages/franchises/franchises.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'vendors',
    loadComponent: () =>
      import('./pages/vendors/vendors.component').then((m) => m.VendorsComponent),
  },
  {
    path: 'integrations',
    loadComponent: () =>
      import('./pages/integrations/integrations.component').then((m) => m.IntegrationsComponent),
  },
  {
    path: 'franchises',
    component: FranchisesComponent,
  },
  { path: '**', redirectTo: 'home' },
];

