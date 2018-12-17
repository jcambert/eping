
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IPingState {
    
    
  }


@Module({ dynamic: true, name:'ping',store:store})
export class PingStore extends VuexModule implements IPingState{


    
   
}
const PingModule = getModule(PingStore);
export default PingModule