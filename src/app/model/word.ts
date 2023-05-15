import { WordI } from '../interface/word-i';

export class Word implements WordI {
  english!: string;
  english__1!: string;
  etym!: string;
  french!: string;
  likes!: number;
  meaning!: string;
  mobile_share!: string;
  syn!: string;
  _id!: string;
  isLiked!: boolean;
  isSaved!: boolean;
  constructor(obj?: Partial<Word>) {
    Object.assign(this, obj);
  }
}
