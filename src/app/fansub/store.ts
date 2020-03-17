import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';
import Axios from 'axios';
import { Fansub, AnimeWithEpisodesAndSubtitle, EpisodeWithSubtitle } from '@/models';
import Helper from '@/utils/helper';

export interface IFansubState {
  fansub: Fansub;
  animes: AnimeWithEpisodesAndSubtitle[];
}

@Module({
  name: 'Fansub',
  store,
  dynamic: true,
  namespaced: true,
})
class FansubModule extends VuexModule implements IFansubState {
  public fansub: Fansub = {} as Fansub;
  public animes: AnimeWithEpisodesAndSubtitle[] = [];

  @MutationAction({ mutate: ['fansub'] })
  public async LoadFansub(acronym: string) {
    const fansub = (await Axios.get<Fansub>(`fansub/${acronym}`)).data;

    return {
      fansub,
    };
  }

  @MutationAction({ mutate: ['animes'] })
  public async LoadAnimes(acronym: string) {
    const animes = (await Axios.get<AnimeWithEpisodesAndSubtitle[]>(`fansub/${acronym}/animes`)).data;

    animes.forEach(
      (a: AnimeWithEpisodesAndSubtitle) =>
        a.episodes.forEach(
          (e: EpisodeWithSubtitle) =>
            e.subtitle.modificationDate = Helper.StringToDateTime(e.subtitle.modificationDate.toString()).toLocal(),
        ),
    );

    return {
      animes,
    };
  }

  @MutationAction({ mutate: ['fansub'] })
  public async CleanFansub() {
    return {
      fansub: {},
    };
  }
}

export default getModule(FansubModule);
