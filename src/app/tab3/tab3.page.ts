import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WordsService } from 'src/service/words.service';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public tabAlreadySaved: Word[] = [];
  public filteredTab: Word[] = [];
  public isEmpty = false;

  public inputValue!: string;
  constructor(private wordsService: WordsService) {}

  ionViewWillEnter() {
    console.log('test');
    this.checkStorage();
    this.filteredTab = [];
  }

  public checkStorage() {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      this.tabAlreadySaved = JSON.parse(localStorage.getItem('saved') ?? '[]');
      console.log(this.tabAlreadySaved);
    } else {
      // save new localStorage
      console.log('pas de storage');
    }
  }

  public onDelete(i: Word) {
    this.wordsService.removeItem$.next(i);
    if (localStorage.getItem('saved')) {
      // extract localStorage
      this.tabAlreadySaved = JSON.parse(localStorage.getItem('saved') ?? '[]');
      console.log(this.tabAlreadySaved);
      this.tabAlreadySaved = this.tabAlreadySaved.filter(
        (item) => item._id !== i._id
      );
      localStorage.setItem('saved', JSON.stringify(this.tabAlreadySaved));
    } else {
      // save new localStorage
      console.log('pas de storage');
    }
  }

  public onSubmit() {
    this.isEmpty = false;
    this.filteredTab = [];
    console.log(this.inputValue);
    if (!this.inputValue) {
      console.log('this field needs something !');
    } else {
      const inputWord = this.inputValue.trim();
      this.filteredTab = this.tabAlreadySaved.filter((item) =>
        item.french.includes(inputWord)
      );
      console.log(this.filteredTab);
      if (this.filteredTab.length === 0) {
        console.log('pas de mot correspondant');
        this.isEmpty = true;
      }
    }
  }

  public onInputChange() {
    this.isEmpty = false;
    if (this.inputValue === '') {
      // clearInput changed, inputValue is empty
      this.filteredTab = [];
    }
  }
}

//  const findItem = local.find((item) => item._id === obj._id);
//       if (!findItem) {
//         obj.isLiked = true;
//         this.tabAlreadyLiked.unshift(obj);
//         localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
//         this.onIncrement(obj);
//       }
//       if (findItem) {
//         // decrement
//         console.log('to decrement');
//         obj.isLiked = false;
//         this.tabAlreadyLiked = this.tabAlreadyLiked.filter(
//           (item) => item._id !== findItem._id
//         );
//         // decrement dans mongodb
//         // update localstorage
//         localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
//         this.onDecrement(obj);
//       }
//     } else {
//       // save new localStorage
//       console.log(obj);
//       obj.isLiked = true;
//       this.tabAlreadyLiked.unshift(obj);
//       localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
//       this.onIncrement(obj);
//     }
