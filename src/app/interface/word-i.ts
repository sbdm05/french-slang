import { WordsService } from 'src/service/words.service';

export type WordI = {
  english: string;
  english__1: string;
  etym: string;
  french: string;
  likes: number;
  meaning: string;
  mobile_share: string;
  syn: string;
  isLiked: boolean;
  isSaved: boolean;
};

export type WordResults = {
  data: WordI[];
};

export type SearchResults = { success: boolean; msg: WordI[] | string };
