import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiService } from './core';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'token', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate:[AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private api: ApiService){}
}
