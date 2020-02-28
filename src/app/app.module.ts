import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {AuthInterceptor} from './interceptors/auth.interceptor';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {EmptyLayoutComponent} from './empty-layout/empty-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DescriptionComponent} from './components/description/description.component';
import {HeaderComponent} from './main-layout/header/header.component';
import {SideBarComponent} from './main-layout/side-bar/side-bar.component';
import {MenuComponent} from './main-layout/menu/menu.component';
import {SettingsComponent} from './components/applicationComponents/settings/settings.component';
import {ProfileComponent} from './components/applicationComponents/profile/profile.component';
import {NavigationMenuComponent} from './main-layout/navigation-menu/navigation-menu.component';
import {HomeComponent} from './components/applicationComponents/home/home.component';
import {CategoryComponent} from './components/applicationComponents/category/category.component';
import {adminReducer, categoryReducer} from './redux/category.reducer';
import {StoreModule} from '@ngrx/store';
import {CreateCategoryComponent} from './main-layout/create-category/create-category.component';
import {EditCategoryComponent} from './main-layout/edit-category/edit-category.component';
import {DeleteCategoryComponent} from './main-layout/delete-category/delete-category.component';
import {AddPostComponent} from './components/applicationComponents/add-post/add-post.component';
import {QuillModule} from 'ngx-quill';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SubcategoryComponent} from './components/applicationComponents/subcategory/subcategory.component';
import {ListSubcategoryComponent} from './components/applicationComponents/list-subcategory/list-subcategory.component';
import {PostComponent} from './components/applicationComponents/post/post.component';
import {registerLocaleData} from '@angular/common';
import uaLocale from '@angular/common/locales/ru-UA';
import {SearchPipe} from './pipes/search.pipe';
import {EditPostComponent} from './components/applicationComponents/edit-post/edit-post.component';
import {AlertComponent} from './main-layout/alert/alert.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditPasswordComponent} from './main-layout/edit-password/edit-password.component';
import {AdminLayoutComponent} from './admin/admin-layout/admin-layout.component';
import {EditStartPageComponent} from './admin/admin-main-layout/edit-start-page/edit-start-page.component';
import {AdminMainLayoutComponent} from './admin/admin-main-layout/admin-main-layout.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';

registerLocaleData(uaLocale, 'ua');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    RegistrationComponent,
    LoginComponent,
    DescriptionComponent,
    HeaderComponent,
    SideBarComponent,
    MenuComponent,
    SettingsComponent,
    ProfileComponent,
    NavigationMenuComponent,
    HomeComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    AddPostComponent,
    SubcategoryComponent,
    ListSubcategoryComponent,
    PostComponent,
    SearchPipe,
    EditPostComponent,
    AlertComponent,
    EditPasswordComponent,
    AdminLayoutComponent,
    EditStartPageComponent,
    AdminMainLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({category: categoryReducer, admin: adminReducer})


  ],
  providers: [INTERCEPTOR_PROVIDER, AngularFireDatabase],
  bootstrap: [AppComponent],
})
export class AppModule {
}
