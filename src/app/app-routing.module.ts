import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JokeComponent } from './components/joke/joke.component';
import { SimpleComponent } from './components/simple/simple.component';

const routes: Routes = [
  { path: 'jokes', component: JokeComponent },
  { path: 'simple', component: SimpleComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
