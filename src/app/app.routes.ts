import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.view';
import { ArticleViewComponent } from './views/article/article.view';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'article/:id',
    component: ArticleViewComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
