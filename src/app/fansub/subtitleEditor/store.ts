import { Module, VuexModule, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { parse, ParsedASS, ParsedASSEventObject, ParsedASSEventTextParsed } from 'ass-compiler';
import { Subtitle } from '@/models';
import Axios from 'axios';

export interface ISubtitleEditor {
  subtitle: ParsedASS;
}

@Module({
  name: 'SubtitleEditor',
  store,
  dynamic: true,
  namespaced: true,
})
class SubtitleEditorModule extends VuexModule implements ISubtitleEditor {
  public subtitle: ParsedASS = {} as ParsedASS;

  @MutationAction({ mutate: ['subtitle'] })
  public async LoadSubtitle() {
    const subtitle = (await Axios.get<Subtitle>(`Subtitle/fansubs/algo/animes/violet-evergarden/episodes/1`)).data;
    const ass = (await Axios.get(subtitle.url.toString(), {
      transformRequest: [(data, headers) => {
        delete headers.common.Authorization
        return data
      }]
    })).data;

    const parsed = parse(ass);

    return {
      subtitle: parsed,
    }
  }

  public async SavePartial() {
    
  }


}

export default getModule(SubtitleEditorModule);