
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {
    title: string;
    loginSettingsDialog:boolean
  }


@Module({ dynamic: true, name:'app',store:store})
export class ApplicationStore extends VuexModule implements IAppState{
    title=""
    loginSettingsDialog=false

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

   

   
}
const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule