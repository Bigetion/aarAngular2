import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { RolesComponent } from './roles';
import { UsersComponent } from './users';
import { PermissionsComponent } from './permissions';
import { ProfileComponent } from './profile';
import { PostsComponent } from './posts';
import { LoginComponent } from './login';
import { NotFoundComponent } from './not-found';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
