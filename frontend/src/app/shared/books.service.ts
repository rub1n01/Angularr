import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs";

export interface Book{
    id: number,
    title: string,
    author: string,
    isbn: string,
    description: string
}

@Injectable({providedIn: 'root'})
export class BooksService{
    public books: Book[] = []
    constructor(private http: HttpClient){}

    fetchBooks(): Observable<Book[]>{
        return this.http.get<Book[]>('http://localhost:5000/api/book_list/').pipe(tap(books => this.books = books))
    }

    fetchBook(url: any){
        return this.http.get(url)
    }
}