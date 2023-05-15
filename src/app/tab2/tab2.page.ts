import { Component, Input } from '@angular/core';
import { WordsService } from 'src/service/words.service';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public inputValue!: string;
  public responseCollection!: Word[];

  constructor(private wordsService: WordsService) {}

  public onSubmit() {
    console.log(this.inputValue);
    // clean input
    if (!this.inputValue) {
      console.log('this field needs something !');
    } else {
      const inputWord = this.inputValue.trim();
      if (inputWord.length <= 1) {
        console.log('this field needs something !');
      } else {
        console.log(inputWord.length);
        // faire appel au service
        this.onSearch(inputWord);
      }
    }
  }

  public onSearch(i: string) {
    const objToSearch = new Word();
    objToSearch.french = i;
    console.log(objToSearch);

    // call the service
    this.wordsService.onSearchWord(objToSearch).subscribe((response) => {
      console.log(response);
      this.responseCollection = response;
    });
  }
}
