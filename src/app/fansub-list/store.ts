import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';
// import Axios from 'axios';
// import { Fansub, AnimeWithEpisodesAndSubtitle, EpisodeWithSubtitle } from '@/models';
// import { DateTime } from 'luxon';
// import Helper from '@/utils/helper';

export interface IFansubListState {
  a: string;
}

@Module({
    name: 'FansubList',
    store,
    dynamic: true,
    namespaced: true,
  })
class FansubListModule extends VuexModule implements IFansubListState {
  public a: string = '';

}

export default getModule(FansubListModule);
