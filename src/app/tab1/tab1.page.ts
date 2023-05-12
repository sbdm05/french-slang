import { Component } from '@angular/core';
import { WordsService } from 'src/service/words.service';
import { Word } from '../model/word';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public collection!: Word[];
  public tabAlreadySaved!: Word[];

  constructor(private wordsService: WordsService) {
    // get all datas
    this.wordsService.getAllDatas().subscribe((data) => {
      //this.collection = data;
      console.log(this.collection);
      this.checkStorage(data);
    });
  }

  public checkStorage(data: Word[]) {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      this.tabAlreadySaved = JSON.parse(localStorage.getItem('saved') ?? '[]');
      data.forEach((item) => {
        const objFound = this.tabAlreadySaved.find(
          (word) => word._id === item._id
        );
        if (objFound) {
          console.log(objFound, 'existes dans le localStorage');
          //modifier item
          objFound.isLiked = true;
          Object.assign(item, objFound);
          this.collection = data;
        } else {
          console.log('pas dans le localstorage');
          this.collection = data;
        }
      });
    } else {
      // save new localStorage
      console.log('pas de storage à vérifier');
    }
  }

  onLike(i: Word) {
    // d'abord on vérifie le localStorage
    this.manageStorage(i);
  }

  manageStorage(obj: Word) {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      const local: Word[] = JSON.parse(localStorage.getItem('saved') ?? '[]');
      const findItem = local.find((item) => item._id === obj._id);
      if (!findItem) {
        obj.isLiked = true;
        this.tabAlreadySaved.push(obj);
        localStorage.setItem('saved', JSON.stringify(this.tabAlreadySaved));
        this.onIncrement(obj);
      }
      if (findItem) {
        // decrement
        console.log('to decrement');
        obj.isLiked = false;
        // decrement dans mongodb
        // update localstorage



      }
    } else {
      // save new localStorage
      this.tabAlreadySaved.push(obj);
      localStorage.setItem('saved', JSON.stringify(this.tabAlreadySaved));
      this.onIncrement(obj);
    }
  }

  onIncrement(obj: Word) {
    let nberOfLike = Number(obj.likes);
    console.log(typeof nberOfLike);
    // incrementer
    nberOfLike++;
    console.log(nberOfLike);
    // appel au service pour methode incrementer like
    this.wordsService.onIncrementLike(obj, nberOfLike).subscribe((data) => {
      console.log(data.msg, 'updated obj');
      const newObj = data.msg;
      Object.assign(obj, newObj);
    });
  }

  identify(index: number, item: Word) {
    return item.likes;
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
