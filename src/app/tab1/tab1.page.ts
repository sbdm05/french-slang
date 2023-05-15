import { Component } from '@angular/core';
import { WordsService } from 'src/service/words.service';
import { Word } from '../model/word';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public collection!: Word[];
  public tabAlreadyLiked: Word[] = [];
  public tabAlreadySaved: Word[] = [];

  constructor(private wordsService: WordsService) {
    // get all datas
    this.wordsService.getAllDatas().subscribe((data) => {
      //this.collection = data;
      console.log(this.collection);
      this.checkLikeStorage(data);
      this.checkSaveStorage(data);
    });
  }

  public checkLikeStorage(data: Word[]) {
    if (localStorage.getItem('liked')) {
      // extract localStorage
      this.tabAlreadyLiked = JSON.parse(localStorage.getItem('liked') ?? '[]');
      data.forEach((item) => {
        const objFound = this.tabAlreadyLiked.find(
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
      this.collection = data;
    }
  }

  public checkSaveStorage(data: Word[]) {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      this.tabAlreadySaved = JSON.parse(localStorage.getItem('saved') ?? '[]');
      data.forEach((item) => {
        const objFound = this.tabAlreadySaved.find(
          (word) => word._id === item._id
        );
        if (objFound) {
          console.log(objFound, 'existes dans le localStorage saved');
          //modifier item
          objFound.isSaved = true;
          Object.assign(item, objFound);
          this.collection = data;
        } else {
          console.log('pas dans le localstorage saved');
          this.collection = data;
        }
      });
    } else {
      // save new localStorage
      console.log('pas de storage à vérifier');
      this.collection = data;
    }
  }

  onLike(i: Word) {
    // d'abord on vérifie le localStorage
    this.manageLikeStorage(i);
  }

  onSave(i: Word) {
    // d'abord on vérifie le localStorage
    this.manageSaveStorage(i);
  }

  manageSaveStorage(obj: Word) {
    if (localStorage.getItem('saved')) {
      // extract localStorage
      let local: Word[] = JSON.parse(localStorage.getItem('saved') ?? '[]');
      const findItem = local.find((item) => item._id === obj._id);
      if (!findItem) {
        // new obj
        obj.isSaved = true;
        local.unshift(obj);
        localStorage.setItem('saved', JSON.stringify(local));
      }
      if (findItem) {
        // obj existant
        obj.isSaved = false;
        local = local.filter((item) => item._id !== findItem._id);
        localStorage.setItem('saved', JSON.stringify(local));
      }
    } else {
      // save new localStorage
      console.log(obj);
      obj.isSaved = true;
      let local = [];
      local.unshift(obj);
      localStorage.setItem('saved', JSON.stringify(local));
    }
  }

  manageLikeStorage(obj: Word) {
    if (localStorage.getItem('liked')) {
      // extract localStorage
      const local: Word[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
      const findItem = local.find((item) => item._id === obj._id);
      if (!findItem) {
        obj.isLiked = true;
        this.tabAlreadyLiked.unshift(obj);
        localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
        this.onIncrement(obj);
      }
      if (findItem) {
        // decrement
        console.log('to decrement');
        obj.isLiked = false;
        this.tabAlreadyLiked = this.tabAlreadyLiked.filter(
          (item) => item._id !== findItem._id
        );
        // decrement dans mongodb
        // update localstorage
        localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
        this.onDecrement(obj);
      }
    } else {
      // save new localStorage
      console.log(obj);
      obj.isLiked = true;
      this.tabAlreadyLiked.unshift(obj);
      localStorage.setItem('liked', JSON.stringify(this.tabAlreadyLiked));
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
    this.wordsService.onUpdateLike(obj, nberOfLike).subscribe((data) => {
      console.log(data.msg, 'updated obj');
      const newObj = data.msg;
      Object.assign(obj, newObj);
    });
  }

  onDecrement(obj: Word) {
    let nberOfLike = Number(obj.likes);
    console.log(typeof nberOfLike);
    // incrementer
    nberOfLike--;
    console.log(nberOfLike);
    // appel au service pour methode incrementer like
    this.wordsService.onUpdateLike(obj, nberOfLike).subscribe((data) => {
      console.log(data.msg, 'updated obj');
      const newObj = data.msg;
      Object.assign(obj, newObj);
    });
  }

  identify(index: number, item: Word) {
    return item.likes;
  }

  public async onShare(obj: Word) {
    console.log(obj);
    const word = `Just found out that "${obj.french}" in french, means "${obj.english__1}"`;
    console.log(word)
    await Share.share({
      title: "French Slang",
      text: word,
      url: 'https://ohmycode.io/',
      dialogTitle: 'Check this french slang word',
    });
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
