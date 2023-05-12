import { Component } from '@angular/core';
import { WordsService } from 'src/service/words.service';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public collection!: Word[];

  constructor(private wordsService : WordsService) {
    // get all datas
    this.wordsService.getAllDatas().subscribe(data=>{
      this.collection = data
      console.log(this.collection);
    })

  }

  onLike(i:Word){

  }
}


/**
 *
 * au like
 * appel au service avec incrementation
 * prendre likes value
 * check if number
 * increment
 * save new value
 * si compliqué de refresh component avec new value, alors on modifie provisoirement la valeur affichée
 * save le like dans un localstorage 'liked' qui sera appelé au démarrage de l'application
 *
 * au save
 * save dans un localstorage 'saved' qui sera appelé au démarrage du composant favorites et au démarrage du composant
 * tab1
 *
 *
 */
