import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { WordResults } from 'src/app/interface/word-i';
import { Word } from 'src/app/model/word';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  public removeItem$ = new Subject<Word>();

  getAllDatas(): Observable<Word[]> {
    return this.http
      .get<WordResults>(
        'https://words-backend-tau.vercel.app/api/v1/words/sample'
      )
      .pipe(map((tab) => tab.data.map((word) => new Word(word))));
  }

  onUpdateLike(obj: Word, nber: number): Observable<any> {
    // // créer nouvel obj avec nouvelle valeur
    const newObj = new Word(obj);
    newObj.likes = nber;
    // // passer newObj au serveur
    return this.http
      .patch<any>(
        'https://words-backend-tau.vercel.app/api/v1/words/update-like',
        newObj
      )
      .pipe(map((word: Partial<Word>) => new Word(word)));
  }

  onSearchWord(i: Word): Observable<Word[]> {
    return this.http
      .post<WordResults>(
        'https://words-backend-tau.vercel.app/api/v1/words/search',
        i
      )
      .pipe(map((tab) => tab.data.map((word) => new Word(word))));
  }
}
