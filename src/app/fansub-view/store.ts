import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { Fansub, AnimeWithEpisodesAndSubtitle } from '@/models';

import { FansubService } from '@/services';

export interface IFansubViewState {
  fansub: Fansub;
  animes: AnimeWithEpisodesAndSubtitle[];
}

@Module({
  name: 'FansubView',
  store,
  dynamic: true,
  namespaced: true,
})
class FansubViewModule extends VuexModule implements IFansubViewState {
  public fansub: Fansub = {} as Fansub;
  public animes: AnimeWithEpisodesAndSubtitle[] = [];

  @MutationAction({ mutate: ['fansub'] })
  public async LoadFansub(acronym: string) {
    return {
      fansub: await FansubService.Get(acronym),
    };
  }

  @MutationAction({ mutate: ['animes'] })
  public async LoadAnimes(acronym: string) {
    return {
      animes: await FansubService.GetAnimes(acronym),
    };
  }

  @MutationAction({ mutate: ['fansub'] })
  public async CleanFansub() {
    return {
      fansub: {},
    };
  }
}

export default getModule(FansubViewModule);
