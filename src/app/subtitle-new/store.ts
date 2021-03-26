import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';

// export interface ISubtitleNewState {}

@Module({
  name: 'SubtitleNew',
  store,
  dynamic: true,
  namespaced: true,
})
class SubtitleNewModule extends VuexModule /*implements ISubtitleNewState*/ {

}

export default getModule(SubtitleNewModule);
