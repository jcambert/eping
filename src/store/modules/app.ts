
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {
    title: string;
    loginSettingsDialog:boolean
    //bearer:string|undefined
    apiSettings:any|undefined
    user:User |undefined
  }

export interface User{
    id:string,
    nom:string,
    prenom:string,
    nomClub:string,
    numeroClub:string
}
@Module({ dynamic: true, name:'app',store:store})
export class ApplicationStore extends VuexModule implements IAppState{
    title=""
    loginSettingsDialog=false
    //private bearer =sessionStorage.getItem('bearer')as string// :string|undefined
    apiSettings:any|undefined
    //server:string="";

    user:User | undefined 

    
    @Mutation
    SET_USER(value:User){
        this.user=value
        sessionStorage.setItem('user',JSON.stringify( value))
    }

    @Action({commit:'SET_USER'})
    setUser(user:User){
        return user
    }
   
    get USER():User|undefined{
        let v=sessionStorage.getItem('user')
        if(v)
            return JSON.parse(v)
        return undefined
    }
    @Mutation
    SET_SERVER(value:string){
        //this.server=value
        localStorage.setItem('server',value)
    }

    @Action({commit:'SET_SERVER'})
    setServer(server:string|undefined){
        return server
    }

    get server():string{
        return localStorage.getItem('server') as string
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
        console.log('set bearer to ', value)
        
        //this.bearer = value;
        if(value==undefined){
            this.user=undefined
            this.apiSettings=undefined
            sessionStorage.removeItem('bearer')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('api')
        }else{
            sessionStorage.setItem('bearer',value)
        }

    }
    @Action({commit:'BEARER'})
    setBearer(value:string){
        return value
    }

    get bearer():string{
        return sessionStorage.getItem('bearer') as string
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
        sessionStorage.setItem('api',JSON.stringify(value))
    }

    get API(){
        let v=sessionStorage.getItem('api')
        if(v)
            return JSON.parse(v)
    }
   
}
const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule