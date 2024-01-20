import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Canvas2DComponent } from './canvas2d/canvas2d.component';
import { ManualtestingComponent } from './manualtesting/manualtesting.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { FractileComponent } from './fractile/fractile.component';
import { PaintComponent } from './paint/paint.component';
import { CalculusComponent } from './calculus/calculus.component';
import { Art2DComponent } from './art2-d/art2-d.component';
import { PhotosComponent } from './photos/photos.component';
import { EmailComponent } from './email/email.component';
import { ZxyComponent } from './zxy/zxy.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    Canvas2DComponent,
    ManualtestingComponent,
    NotFoundComponent,
    FractileComponent,
    PaintComponent,
    CalculusComponent,
    Art2DComponent,
    PhotosComponent,
    EmailComponent,
    ZxyComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
