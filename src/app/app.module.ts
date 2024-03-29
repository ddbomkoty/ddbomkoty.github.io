import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoComponent } from './logo/logo.component';
import { ParallaxDirective } from './parallax.directive';
import { NgImageFullscreenViewModule } from "ng-image-fullscreen-view";
import { MatIconModule } from "@angular/material/icon";
import { Welcome2Component } from "./welcome2/welcome2.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Welcome2Component,
    LogoComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgImageFullscreenViewModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
