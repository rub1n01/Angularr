import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      title: [''],
      author: [''],
      isbn: [''],
      description: [''],
      pic: [null]
    })
  }

  ngOnInit() { }

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

    this.http.post<any>("http://localhost:5000/api/create_book/", formData).subscribe(
  (res) => console.log(res),
  (err) => console.log(err)
  );
  this.router.navigate(['books'])
  }

}


