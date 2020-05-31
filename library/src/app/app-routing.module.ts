import { SearchBookComponent } from './dashboard/bookstore/search-book/search-book.component';
import { SpecializedBookComponent } from './dashboard/bookstore/specialized-book/specialized-book.component';
import { SpecializedComponent } from './dashboard/bookstore/specialized/specialized.component';
import { UserComponent } from './dashboard/user/user.component';
import { BookstoreComponent } from './dashboard/bookstore/bookstore.component';
import { SearchDocumentComponent } from './dashboard/book/search-document/search-document.component';
import { DocumentComponent } from './dashboard/book/document/document.component';
import { CategoryComponent } from './dashboard/book/category/category.component';
import { BookComponent } from './dashboard/book/book.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
  },
  {
      path: 'register',
      component: RegisterComponent,
  },
  {
    path: 'dashboard',
          component: DashboardComponent,
          children: [
              {
                path: 'home',
                component: HomeComponent,
              },
              {
                  path: 'book',
                  component: BookComponent,
                  children: [
                    {
                      path: 'category',
                      component: CategoryComponent,
                    },
                    {
                      path: 'document',
                      component: DocumentComponent,
                    },
                    {
                      path: 'search-document',
                      component: SearchDocumentComponent,
                    },
                  ],
              },
              {
                path: 'bookstore',
                component: BookstoreComponent,
                children: [
                    {
                      path: 'specialized',
                      component: SpecializedComponent,
                    },
                    {
                      path: 'specialized-book',
                      component: SpecializedBookComponent,
                    },
                    {
                      path: 'search-book',
                      component: SearchBookComponent,
                    },
                ],
              },
              {
                path: 'user',
                component: UserComponent,
              },
          ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
