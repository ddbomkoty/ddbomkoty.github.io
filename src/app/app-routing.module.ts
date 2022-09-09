import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome2Component } from "./welcome2/welcome2.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'stepan', component: Welcome2Component },
  { path: 'степан', component: Welcome2Component },
  // { path: 'about', component: AboutComponent },
  // { path: 'fire', component: FireComponent },
  // { path: 'you', component: YouComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
