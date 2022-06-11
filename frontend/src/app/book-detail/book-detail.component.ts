import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BooksService } from '../shared/books.service';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  id: number | undefined;
  book: any;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private bookService: BooksService){
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }
  ngOnInit(): void {
    this.bookService.fetchBook("http://localhost:5000/api/book/" + this.id + "/").subscribe((data) => (this.book = data))
  }
}
