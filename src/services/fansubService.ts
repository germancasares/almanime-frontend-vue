import { FansubNew, Fansub, FansubAnime, ModelWithMeta, FansubEpisode, FansubUser } from '@/models';
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
    const fansub = (await Axios.get(`fansub/${acronym}`)).data;

    if (fansub.Webpage !== undefined) {
      fansub.webpage = new URL(fansub.webpage);
    }

    return fansub;
  }

  public static async GetCompletedAnimes(acronym: string): Promise<ModelWithMeta<FansubAnime[]>> {
    const page = (await Axios.get(`fansub/${acronym}/completedAnimes`)).data;

    page.models.forEach((anime: FansubAnime) => {
      anime.finishedDate = Helper.StringToDateTime(anime.finishedDate.toString());
    });

    return page;
  }

  public static async GetCompletedEpisodes(acronym: string): Promise<ModelWithMeta<FansubEpisode[]>> {
    const page = (await Axios.get(`fansub/${acronym}/completedEpisodes`)).data;

    page.models.forEach((episode: FansubEpisode) => {
      episode.finishedDate = Helper.StringToDateTime(episode.finishedDate.toString());
    });

    return page;
  }

  public static async GetMembers(acronym: string): Promise<FansubUser[]> {
    return (await Axios.get(`fansub/${acronym}/members`)).data;
  }

}
