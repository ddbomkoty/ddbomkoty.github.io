import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: AboutComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'fire', component: FireComponent },
  // { path: 'you', component: YouComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
