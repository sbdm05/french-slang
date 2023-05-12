import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getAllDatas() {
    return this.http.get<any>('https://words-backend-tau.vercel.app/api/v1/words/sample');
  }
}
