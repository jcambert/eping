
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {
    title: string;
    
  }


@Module({ dynamic: true, name:'app',store:store})
export class ApplicationStore extends VuexModule implements IAppState{
    title=""
    tokenEndPointDialog=false
    tokenEndPoint:string | undefined;
    user:{} |undefined
    @Mutation
    TITLE_CHANGE( value: string) {
        this.title = value;
    }

    @Action({ commit: 'TITLE_CHANGE' })
    settitle(value: string):string {
        return value
    }
    
    @Mutation
    TOKENENDPOINT_DIALOG(value:boolean){
        this.tokenEndPointDialog=value
    }

    @Action({commit:'TOKENENDPOINT_DIALOG'})
    showTokenEndPointDialog(){
        return true
    }
    @Action({commit:'TOKENENDPOINT_DIALOG'})
    hideTokenEndPointDialog(){
        return false
    }

    @Mutation
    SET_ENDPOINT(value:string){
        this.tokenEndPoint=value
    }

    @Action({commit:'SET_ENDPOINT'})
    setEndPoint(endpoint:string|undefined){
        return endpoint
    }

    get EndPoint(){
        return this.tokenEndPoint
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
const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule