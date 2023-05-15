import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public inputValue!: string;

  constructor() {}

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
      }
    }
  }
}
