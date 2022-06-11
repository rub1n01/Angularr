import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { CreateBookComponent } from './create-book/create-book.component';

const routes: Routes = [
  {path: '*', component: AppComponent},
  {path: 'books', component: BookListComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'book/:id/edit', component: EditBookComponent},
  {path: 'create_book', component: CreateBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
