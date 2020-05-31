import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbMenuModule, NbCardModule, NbSelectModule, NbTreeGridModule, NbIconModule, NbDialogModule, NbWindowModule, NbToastrModule, NbListModule, NbRadioModule, NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { CategoryComponent } from './dashboard/book/category/category.component';
import { BookstoreComponent } from './dashboard/bookstore/bookstore.component';
import { UserComponent } from './dashboard/user/user.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { CategoryDetailComponent } from './component/category-detail/category-detail.component';
import { DocumentDetailComponent } from './component/document-detail/document-detail.component';
import { BookstoreDetailComponent } from './component/bookstore-detail/bookstore-detail.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookComponent } from './dashboard/book/book.component';
import { SearchDocumentComponent } from './dashboard/book/search-document/search-document.component';
import { SpecializedComponent } from './dashboard/bookstore/specialized/specialized.component';
import { SpecializedBookComponent } from './dashboard/bookstore/specialized-book/specialized-book.component';
import { SearchBookComponent } from './dashboard/bookstore/search-book/search-book.component';
import { DocumentComponent } from './dashboard/book/document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DocumentComponent,
    BookstoreComponent,
    UserComponent,
    HomeComponent,
    MenuComponent,
    CategoryDetailComponent,
    DocumentDetailComponent,
    BookstoreDetailComponent,
    UserDetailComponent,
    MessageDialogComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    SearchDocumentComponent,
    SpecializedComponent,
    SpecializedBookComponent,
    SearchBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbTreeGridModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbListModule,
    NbRadioModule,
    NbToggleModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
