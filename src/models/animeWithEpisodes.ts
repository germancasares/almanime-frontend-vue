import { Anime, Episode } from '.';

export interface AnimeWithEpisodes extends Anime {
  episodes: Episode[];
}
