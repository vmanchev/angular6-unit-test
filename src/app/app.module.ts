import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SimpleComponent } from './components/simple/simple.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './providers/user/user.service';
import { ItemService } from './providers/item/item.service';
import { ItemComponent } from './components/item/item.component';
import { UserComponent } from './components/user/user.component';
import { FormatAddressPipe } from './pipes/format-address/format-address.pipe';
import { ToUpperPipe } from './pipes/to-upper/to-upper.pipe';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    ItemComponent,
    UserComponent,
    FormatAddressPipe,
    ToUpperPipe,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
