
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '../'


export interface IHomeState {

    message:string
  }


@Module({ dynamic: true, name:'home',store:store})
 export class HomeStore extends VuexModule implements IHomeState {
   
    message=""

    
  
    @Mutation
    SET_MESSAGE(message:string){
        this.message=message
    }
    

    @Action({commit:'SET_MESSAGE'})
    setMessage(message:string){
        return message
    }
}
const HomeModule = getModule(HomeStore);
export default HomeModule