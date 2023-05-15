import { Component } from '@angular/core';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public tabAlreadySaved!: Word[];
  constructor() {}

  ionViewWillEnter() {
    console.log('test');
    this.checkStorage();
  }

  public checkStorage() {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      this.tabAlreadySaved = JSON.parse(localStorage.getItem('saved') ?? '[]');
      console.log(this.tabAlreadySaved)

    } else {
      // save new localStorage
      console.log('pas de storage');

    }
  }
}
