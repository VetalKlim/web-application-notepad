import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmptyLayoutComponent} from './empty-layout/empty-layout.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {DescriptionComponent} from './components/description/description.component';
import {AuthGuard} from './services/auth.guard';
import {SettingsComponent} from './components/applicationComponents/settings/settings.component';
import {ProfileComponent} from './components/applicationComponents/profile/profile.component';
import {HomeComponent} from './components/applicationComponents/home/home.component';
import {CategoryComponent} from './components/applicationComponents/category/category.component';
import {AddPostComponent} from './components/applicationComponents/add-post/add-post.component';
import {SubcategoryComponent} from './components/applicationComponents/subcategory/subcategory.component';
import {ListSubcategoryComponent} from './components/applicationComponents/list-subcategory/list-subcategory.component';
import {PostComponent} from './components/applicationComponents/post/post.component';
import {EditPostComponent} from './components/applicationComponents/edit-post/edit-post.component';
import {AdminLayoutComponent} from './admin/admin-layout/admin-layout.component';
import {EditStartPageComponent} from './admin/admin-main-layout/edit-start-page/edit-start-page.component';
import {AdminMainLayoutComponent} from './admin/admin-main-layout/admin-main-layout.component';


const routes: Routes = [
  {
    path: '', component: EmptyLayoutComponent, children: [
      {path: '', redirectTo: '/description', pathMatch: 'full'},
      {path: 'description', component: DescriptionComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
    ]
  },
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      {path: 'user', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'category', component: CategoryComponent, canActivate: [AuthGuard]},
      {path: 'addPost', component: AddPostComponent, canActivate: [AuthGuard]},
      {path: 'subcategory/:id', component: SubcategoryComponent, canActivate: [AuthGuard]},
      {path: 'listSubcategory/:id', component: ListSubcategoryComponent, canActivate: [AuthGuard]},
      {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPostComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: '/description'}
    ],
    canActivate: [AuthGuard]
  },
  {path: 'admin', component: AdminLayoutComponent},
  {
    path: 'adminUser', component: AdminMainLayoutComponent, children: [
      {path: 'adminUser', redirectTo: '/editStartPage', canActivate: [AuthGuard]},
      {path: 'editStartPage', component: EditStartPageComponent, canActivate: [AuthGuard]}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '/description'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
