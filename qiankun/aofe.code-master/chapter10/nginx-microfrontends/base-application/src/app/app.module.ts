import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReaderComponent } from './reader/reader.component';
import { ShoppingComponent } from './shopping/shopping.component';
import {SafePipe} from './pipes/SafePipe';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {GraphModule} from './graph/graph.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReaderComponent,
    ShoppingComponent,
    GamesComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    GraphModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
