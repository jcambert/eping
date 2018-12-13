
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '../'


export interface IHomeState {
    count:number
    message:string
  }


@Module({ dynamic: true, name:'home',store:store})
 export class HomeStore extends VuexModule implements IHomeState {
    count = 0
    message=""

    

    @Mutation
    INCREMENT(delta: number) {
      this.count += delta
      if(store.$vue){
        store.$vue.$emit('toto') ;
      }
        
    }
    @Mutation
    DECREMENT(delta: number) {
      this.count -= delta
    }
  
    @Mutation
    SET_MESSAGE(message:string){
        this.message=message
    }
    // action 'incr' commits mutation 'increment' when done with return value as payload
    @Action({ commit: 'INCREMENT' })
    incr() {
      return 5
    }
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({ commit: 'DECREMENT' })
    decr() {
      return 5
    }

    @Action({commit:'SET_MESSAGE'})
    setMessage(message:string){
        return message
    }
}
const HomeModule = getModule(HomeStore);
export default HomeModule