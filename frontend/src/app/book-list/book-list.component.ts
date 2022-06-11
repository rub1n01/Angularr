import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { BooksService } from '../shared/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private router: Router, public booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe(() => {})
  }

}
