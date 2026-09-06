import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Photos } from './components/photos/photos';
import { Art2D } from './components/art2-d/art2-d';
import { Zxy } from './components/zxy/zxy';
import { Calculus } from './components/calculus/calculus';
import { FractileComponent } from './components/fractile/fractile';
import { Email } from './components/email/email';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'photos', component: Photos },
  { path: 'art2d', component: Art2D },
  { path: 'zxy', component: Zxy },
  { path: 'calculus', component: Calculus },
   { path: 'fractile', component: FractileComponent },
   { path: 'email', component: Email },
  // 
  // { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];
