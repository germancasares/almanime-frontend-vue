import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module
export default class Home extends VuexModule {
  public count = 0;

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  public incr() {
    return 5;
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  public decr() {
    return 5;
  }

  @Mutation
  public increment(delta: number) {
    this.count += delta;
  }
  @Mutation
  public decrement(delta: number) {
    this.count -= delta;
  }
}
