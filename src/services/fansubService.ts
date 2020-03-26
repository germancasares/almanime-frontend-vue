import { FansubNew, Fansub, AnimeWithEpisodesAndSubtitle, EpisodeWithSubtitle } from "@/models";
import Axios from 'axios';
import Helper from '@/utils/helper';

export class FansubService {

  public static async Create(fansub: FansubNew) {
    await Axios.post('fansub', fansub);
  }

  public static async IsFullNameAvailable(fullName: string): Promise<boolean> {
    return await Axios.head(`fansub/fullname/${fullName}`).then(
      () => {
        return false;
      },
      () => {
        return true;
      },
    );
  }

  public static async IsAcronymAvailable(acronym: string): Promise<boolean> {
    return await Axios.head(`fansub/acronym/${acronym}`).then(
      () => {
        return false;
      },
      () => {
        return true;
      },
    );
  }

  public static async Get(acronym: string): Promise<Fansub> {
    return (await Axios.get(`fansub/${acronym}`)).data;
  }

  public static async GetAnimes(acronym: string): Promise<AnimeWithEpisodesAndSubtitle[]> {
    const animes = (await Axios.get(`fansub/${acronym}/animes`)).data

    animes.forEach(
      (a: AnimeWithEpisodesAndSubtitle) =>
        a.episodes.forEach(
          (e: EpisodeWithSubtitle) =>
            e.subtitle.modificationDate = Helper.StringToDateTime(e.subtitle.modificationDate.toString()).toLocal(),
        ),
    );

    return animes;
  }

}