import Vue from "vue";
import ApplicationModule, { ApplicationStore } from "../store/modules/app";
import PingModule, { PingStore } from "../store/modules/ping";
import * as _ from 'lodash'
import { HttpResponse } from "vue-resource/types/vue_resource";
export abstract class PingServiceBase{
    protected vue:Vue
   
    protected get application():ApplicationStore{
        return ApplicationModule
    }
    protected get ping():PingStore{
        return PingModule
    }
    constructor(vue:Vue){
        this.vue=vue;

    }

    private apiUrl(name:string,...params:any[]):string {
        var api=this.application.apiSettings[name]
        if(!api)
            throw new Error(`api ${name} n'existe pas !!`)
        var chunk=api.split(/\{[a-zA-Z]*\}/)
        api=""
        let _params= _.compact(_.flatMap(params))//.compact(params).filter(p=>p!==undefined)
        //console.log(_params)
        for(var i=0;i<=chunk.length-2;i++){
            if(_params[i]!==undefined){
                api+=(chunk[i]+_params[i])
                //console.log(api)
            }
                
           // console.log(api)
        }
        if(chunk[chunk.length-1]  ){
            //console.log(chunk[chunk.length-1])
            api+=chunk[chunk.length-1]
        }
        //console.log(api)
        api=this.application.API.EndPoint+api
        return api
    }
    protected query(name:string,...params:any[]):Promise<HttpResponse>{
        var api = this.apiUrl(name,params)
       // console.log(api)
       let prom = new Promise((resolve,reject)=>{
            this.vue.$http.get(api).then(
                response=>{resolve(response)},
                error=>reject(error)
            );
       })
        return  prom as Promise<HttpResponse>
    }
}