import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 'page2', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // @ts-ignore
  providers: [{ provide: APP_BASE_HREF, useValue: window.__MICRO_APP_BASE_ROUTE__ || '/micro-app/angular11/'}]
})
export class AppRoutingModule { }
