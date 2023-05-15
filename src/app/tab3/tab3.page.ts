import { Component } from '@angular/core';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  public collectionFavorites!: Word[]
  constructor() {}

  ionViewWillEnter() {
    console.log('test');
    this.checkStorage();
  }

  public checkStorage() {

  }
}
