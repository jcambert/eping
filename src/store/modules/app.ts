
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {
    title: string;
    loginSettingsDialog:boolean
    bearer:string|undefined
    apiSettings:any|undefined
    user:{} |undefined
  }


@Module({ dynamic: true, name:'app',store:store})
export class ApplicationStore extends VuexModule implements IAppState{
    title=""
    loginSettingsDialog=false
    bearer:string|undefined
    apiSettings:any|undefined
    server:string="";

    user:{} |undefined
    


    
    @Mutation
    SET_USER(value:{}){
        this.user=value
    }

    @Action({commit:'SET_USER'})
    setUser(user:{}|undefined){
        return user
    }
   

    @Mutation
    SET_SERVER(value:string){
        this.server=value
    }

    @Action({commit:'SET_SERVER'})
    setServer(server:string|undefined){
        return server
    }
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
        this.loginSettingsDialog=value
    }

    @Action({commit:'TOKENENDPOINT_DIALOG'})
    showloginSettingsDialog(){
        return true
    }
    @Action({commit:'TOKENENDPOINT_DIALOG'})
    hideloginSettingsDialog(){
        return false
    }

    @Mutation
    BEARER(value:string){
        this.bearer = value;
        if(this.bearer==undefined){
            this.user=undefined
            this.apiSettings=undefined
        }
    }
    @Action({commit:'BEARER'})
    setBearer(value:string){
        return value
    }

    @Action({commit:'BEARER'})
    logout(){
        return undefined;
    }

    @Action({commit:'API_SETTINGS'})
    setApiSettings(value:any){
        return value;
    }

    @Mutation
    API_SETTINGS(value:any){
        this.apiSettings=value
    }
   
}
const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule