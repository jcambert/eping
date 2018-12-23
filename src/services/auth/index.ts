import Vue from 'vue'
import PingModule from './../../store/modules/ping'
import { $resource, ResourceMethods, ResourceMethod } from 'vue-resource/types/vue_resource';
import { Subject } from 'rxjs';
import ApplicationModule,{ApplicationStore} from './../../store/modules/app'


export interface AuthMethods extends ResourceMethods {
    login: ResourceMethod;
    logout: ResourceMethod;
}

export class Auth{
    vue:Vue
    private _resource:AuthMethods
    private onLoggedInSubject=new Subject<boolean>()
    private onLogoutSubject = new Subject<boolean>()
    private customActions = {
        login: {method: 'POST', url: 'http://localhost:54662/login',before:this.beforeLogin,headers:  {'Access-Control-Allow-Origin': '*',}},
        logout: {method: 'POST', url: 'http://localhost:54662/logout',headers:  {'Access-Control-Allow-Origin': '*',}}
      }
    private beforeLogin(req:any){
        console.log('execute login request',req)
    }
    private get bearer(){
        return {
            'Access-Control-Allow-Origin': '*',
            'Authorization':`Bearer ${this.application.bearer}`
        }
    }
    private get application():ApplicationStore{
        return ApplicationModule
    }
    constructor(vue:Vue){
        this.vue=vue;
        console.log('Auth Service ',this.application.server)
        this._resource= this.vue.$resource('http://localhost:54662',{},
            this.customActions,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }) as AuthMethods
    }
    public login(licence:string,prenom:string){
       // this.vue.$http.post
        return this._resource.login({licenceOrName:licence,prenom:prenom})
    }
    public logout(){
       console.log(sessionStorage.bearer);
       this.vue.$http.post('http://localhost:54662/logout',{'token':sessionStorage.bearer},{ headers: {
            "Authorization": "bearer "+ sessionStorage.bearer ,
            "Accept": "application/json",
            "cache-control": "no-cache"
        }}).then((response)=>{
            this.fireLogout();
        },(error)=>{
            console.error(error);
        })
        //return this._resource.logout();
    }
    public fireLogin(){
        this.onLoggedInSubject.next(true)
    }
    public fireLogout(){
        this.onLogoutSubject.next(true)
    }

    get onLoggedIn():Subject<boolean>{
        return this.onLoggedInSubject
    }
    get onLogout():Subject<boolean>{
        return this.onLogoutSubject
    }
}

//export default auth

export default function AuthService(Vuee: typeof Vue,url:string){
    const auth=new Auth(new Vuee())
    
    Vue.prototype.$auth = auth;

    
} 