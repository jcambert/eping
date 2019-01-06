import Vue from 'vue'

import { $resource, ResourceMethods, ResourceMethod, HttpResponse } from 'vue-resource/types/vue_resource';
import { Subject, Observable, Subscription,interval } from 'rxjs';
import ApplicationModule, { ApplicationStore, IAppState } from '../../store/modules/app';
import { IRootState, EStore } from '../../store';
import { start } from 'repl';
import store from './../../store'

declare type AliveOptionType='http'|'socket'|'signalr'
interface AliveOptions{
    type:AliveOptionType,
    endpoint?:string,
    time?:number
}
export class Alive{
    private vue:Vue
    private timer: Subscription |undefined
    private time:number=1000
    private endpoint:string=""
    public runningState=false

    constructor(vue:Vue,options?:AliveOptions){
        let self=this;
        this.vue=vue;
        this.timer=undefined;
        if(options && options.time)
            this.time=options.time;
        if(options && options.endpoint)
            this.endpoint=options.endpoint;

        store.watch(state=>state.app,(app:IAppState)=>{
          //  console.log('server changed',app.server)
            if(self.timer)
                self.timer.unsubscribe();
            if(self.runningState)
                self.start()
        },{immediate:true,deep:true})
        
    }


    get application():ApplicationStore{
        return ApplicationModule
    }
    public start(){
        
       // console.log('Start aliveness Server Service')
        this.timer=interval(this.time).subscribe(
            ()=>{
               // console.log('Check alive',this.application.server+this.endpoint);
                this.vue.$http.get(this.application.server+this.endpoint)
                    .then(
                        (resp:HttpResponse)=>{
                            if(!this.application.serverStatus)
                                this.application.setServerUp()
                        },
                        (reason:any)=>{
                            if(this.application.serverStatus)
                                this.application.setServerDown()
                        }
                    )
            }
        )
        this.runningState=true
    }

    public stop(){
        if(this.timer)
            this.timer.unsubscribe();
        this.runningState=false
    }

    beforeDestroy(){
        if(this.timer)
            this.timer.unsubscribe();
    }
}

//export default auth

export default function AliveService(Vuee: typeof Vue,options?:AliveOptions){
    const alive=new Alive(new Vuee(),options)
    
    Vue.prototype.$alive = alive;

    
} 