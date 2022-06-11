import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../shared/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  form: FormGroup;
  id: number | undefined;
  book: any = {
    "title": "placeholder",
    "author": "placeholder",
    "isbn": "placeholder",
    "description": "placeholder"
  };
  private routeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private http: HttpClient, private bookService: BooksService) {
    this.form = this.fb.group({
      title: [''],
      author: [''],
      isbn: [''],
      description: [''],
      pic: [null]
    })

    this.routeSubscription = activatedRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.bookService.fetchBook("http://localhost:5000/api/book/" + this.id + "/").subscribe((data) => (this.book = data))
   }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.get('pic').setValue(file);
      }
  }

  onSubmit() {
    var formData = new FormData();
    formData.append('title', this.form.get('title')?.value)
    formData.append('author', this.form.get('author')?.value)
    formData.append('isbn', this.form.get('isbn')?.value)
    formData.append('description', this.form.get('description')?.value)
    formData.append('pic', this.form.get('pic')?.value)

    this.http.put<any>("http://localhost:5000/api/book/" + this.id + "/", formData).subscribe(
  (res) => console.log(res),
  (err) => console.log(err)
  );
  this.router.navigate(['books'])
  }

  deleteBook(){
    this.http.delete<any>("http://localhost:5000/api/book/" + this.id + "/").subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      );
      this.router.navigate(['books'])
  }

}
