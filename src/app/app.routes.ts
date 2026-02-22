import { Routes } from '@angular/router';

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
    path: 'vendors/new',
    loadComponent: () =>
      import('./pages/vendors/vendor-detail.component').then((m) => m.VendorDetailComponent),
  },
  {
    path: 'vendors/:id',
    loadComponent: () =>
      import('./pages/vendors/vendor-detail.component').then((m) => m.VendorDetailComponent),
  },
  {
    path: 'integrations',
    loadComponent: () =>
      import('./pages/integrations/integrations.component').then((m) => m.IntegrationsComponent),
  },
  {
    path: 'integrations/new',
    loadComponent: () =>
      import('./pages/integrations/integration-detail.component').then((m) => m.IntegrationDetailComponent),
  },
  {
    path: 'integrations/:id',
    loadComponent: () =>
      import('./pages/integrations/integration-detail.component').then((m) => m.IntegrationDetailComponent),
  },
  {
    path: 'franchises',
    loadComponent: () =>
      import('./pages/franchises/franchises.component').then((m) => m.FranchisesComponent),
  },
  {
    path: 'franchises/new',
    loadComponent: () =>
      import('./pages/franchises/franchise-detail.component').then((m) => m.FranchiseDetailComponent),
  },
  {
    path: 'franchises/:id',
    loadComponent: () =>
      import('./pages/franchises/franchise-detail.component').then((m) => m.FranchiseDetailComponent),
  },
  { path: '**', redirectTo: 'home' },
];

