import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { RolesComponent } from './roles';
import { UsersComponent } from './users';
import { PermissionsComponent } from './permissions';
import { LoginComponent } from './login';
import { NotFoundComponent } from './not-found';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
