import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from './shared/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.booksService.fetchBooks().subscribe(() => {})
  }

  constructor(public router: Router, public booksService: BooksService) {
    console.log(router.url)
  }
}
