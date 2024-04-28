import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.view';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
