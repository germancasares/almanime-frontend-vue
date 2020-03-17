import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';
// import Axios from 'axios';
// import { Fansub, AnimeWithEpisodesAndSubtitle, EpisodeWithSubtitle } from '@/models';
// import { DateTime } from 'luxon';
// import Helper from '@/utils/helper';

export interface IFansubNewState {

}

@Module({
    name: 'FansubNew',
    store,
    dynamic: true,
    namespaced: true,
  })
class FansubNewModule extends VuexModule implements IFansubNewState {

}

export default getModule(FansubNewModule);