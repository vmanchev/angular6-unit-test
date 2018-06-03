import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleComponent } from './components/simple/simple.component';
import { ItemComponent } from './components/item/item.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'simple', component: SimpleComponent },
  { path: 'items', component: ItemComponent },
  { path: 'users', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
