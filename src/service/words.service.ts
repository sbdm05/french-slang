import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WordResults } from 'src/app/interface/word-i';
import { Word } from 'src/app/model/word';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getAllDatas(): Observable<Word[]> {
    return this.http.get<WordResults>('https://words-backend-tau.vercel.app/api/v1/words/sample').pipe(
      map(tab=> tab.data.map(word=> new Word(word)))
    );
  }
}
