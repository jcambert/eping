
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IPingState {
    tokenEndPoint:string | undefined;
    user:{} |undefined
    
  }


@Module({ dynamic: true, name:'app',store:store})
export class PingStore extends VuexModule implements IPingState{

    tokenEndPoint:string | undefined;
    user:{} |undefined
    
   

    @Mutation
    SET_ENDPOINT(value:string){
        this.tokenEndPoint=value
    }

    @Action({commit:'SET_ENDPOINT'})
    setEndPoint(endpoint:string|undefined){
        return endpoint
    }

    
    @Mutation
    SET_USER(value:{}){
        this.user=value
    }

    @Action({commit:'SET_USER'})
    setUser(user:{}|undefined){
        return user
    }
   
}
const PingModule = getModule(PingStore);
export default PingModule