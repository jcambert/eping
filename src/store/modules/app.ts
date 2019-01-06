
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IAppState {
    title: string;
    loginSettingsDialog:boolean
    //bearer:string|undefined
    apiSettings:any|undefined
    user:User |undefined,
    serverStatus:boolean,
    server:string|undefined
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
    public title=""
    public loginSettingsDialog=false
    //private bearer =sessionStorage.getItem('bearer')as string// :string|undefined
    public apiSettings:any|undefined=JSON.parse(localStorage.getItem('api'))
    //server:string="";
    public serverStatus=false
    public user:User | undefined =JSON.parse(localStorage.getItem('user')) as User
    public server:any = localStorage.getItem('server')
    
    @Mutation
    SET_USER(value:User){
       // console.log('app store new user',value)
        this.user=value
        localStorage.setItem('user',JSON.stringify( value))
    }

    @Action({commit:'SET_USER'})
    setUser(user:User){
        return user
    }
   
    get USER():User|undefined{
        
        let v=localStorage.getItem('user')
        if(v)
            return JSON.parse(v)
        return undefined
    }
    @Mutation
    SET_SERVER(value:string){
       // console.log('set server to ',value)
        this.server=value
        localStorage.setItem('server',value)
    }

    @Action({commit:'SET_SERVER'})
    setServer(server:string|undefined){
        return server
    }

    get SERVER():string{
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
      //  console.log('set bearer to ', value)
        
        //this.bearer = value;
        if(value==undefined){
            this.user=undefined
            this.apiSettings=undefined
            localStorage.removeItem('bearer')
            localStorage.removeItem('user')
            localStorage.removeItem('api')
        }else{
            localStorage.setItem('bearer',value)
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
        localStorage.setItem('api',JSON.stringify(value))
    }

    get API(){
        let v=localStorage.getItem('api')
        if(v)
            return JSON.parse(v)
    }

    @Mutation
    SET_SERVER_STATUS(value:boolean){
        if(value!=this.serverStatus)
            this.serverStatus=value
    }
    @Action({commit:'SET_SERVER_STATUS'})
    setServerUp(){
        //console.log("Server is Up");
        return true
    }
   
    @Action({commit:'SET_SERVER_STATUS'})
    setServerDown(){
        //console.log("Server is Down");
        return false
    }

    get development():boolean{
        return process.env.NODE_ENV!=='production'
    }

    get production():boolean{
        return process.env.NODE_ENV==='production'
    }

}
const ApplicationModule = getModule(ApplicationStore);
export default ApplicationModule