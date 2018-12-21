import Vue from 'vue'

import { $resource, ResourceMethods, ResourceMethod, HttpResponse } from 'vue-resource/types/vue_resource';
import { Subject } from 'rxjs';
import ApplicationModule,{ApplicationStore} from './../../../store/modules/app'
import PingModule,{PingStore} from './../../../store/modules/ping'

export interface AuthMethods extends ResourceMethods {
    login: ResourceMethod;
    logout: ResourceMethod;
}

export class Player{
    vue:Vue
    self:Player=this
    private get application():ApplicationStore{
        return ApplicationModule
    }
    private get ping():PingStore{
        return PingModule
    }
    constructor(vue:Vue){
        this.vue=vue;

    }

    private apiUrl(name:string,...params:any[]):string {
        var api=this.application.API[name]
        if(!api)
            throw new Error(`api ${name} n'existe pas !!`)
        var chunk=api.split(/\{[a-zA-Z]*\}/)
        api=""
        for(var i=0;i<=chunk.length-2;i++){
            api+=(chunk[i]+params[i])
           // console.log(api)
        }
        if(chunk[chunk.length-1])
            api+=chunk[chunk.length-1]

        api=this.application.API.EndPoint+api
        return api
    }
    private query(name:string,...params:any[]):PromiseLike<HttpResponse>{
        var api = this.apiUrl(name,params)
       // console.log(api)
        return this.vue.$http.get(api)
    }
    public getClub(numero:string){
        console.log(numero)
       // return this.self.vue.$http.get(this.apiUrl("club",numero))
        return this.query('Club',numero)
    }
    public getPlayer(licence:string){
      //  console.log(this.application.API.EndPoint+ this.application.API.Joueur.replace('{licence}',licence))
        //return this.vue.$http.get(this.application.API.EndPoint+ this.application.API.Joueur.replace('{licence}',licence))
        return this.query('Joueur',licence)
    }

    public getPlayers(numeroClub:string){
        return this.vue.$http.get(this.application.API.EndPoint+this.application.API.JoueursDuClub.replace('{numero}',numeroClub))
    }
    
}

//export default auth

export default function PlayerService(Vuee: typeof Vue){
    const player=new Player(new Vuee())
    
    Vue.prototype.$player = player;

    
} 