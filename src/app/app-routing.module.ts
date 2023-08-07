import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { NotFoundComponent } from './notfound/notfound.component';
import { ManualtestingComponent } from './manualtesting/manualtesting.component';
import { Canvas2DComponent } from './canvas2d/canvas2d.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FractileComponent } from './fractile/fractile.component';
import { CalculusComponent } from './calculus/calculus.component';
import { Art2DComponent } from './art2-d/art2-d.component';
import { EmailComponent } from './email/email.component'
import { PhotosComponent } from './photos/photos.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'manualtesting', component: ManualtestingComponent },
  { path: 'art2d', component: Art2DComponent },
  { path: 'canvas', component: Canvas2DComponent },
  { path: 'calculus', component: CalculusComponent },
  { path: 'fractile', component: FractileComponent },
  { path: 'email', component: EmailComponent },
  { path: 'photo', component: PhotosComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
