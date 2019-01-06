import Vue from 'vue'

import { $resource, ResourceMethods, ResourceMethod, HttpResponse } from 'vue-resource/types/vue_resource';
import { Subject } from 'rxjs';
import ApplicationModule,{ApplicationStore} from './../../../store/modules/app'
import PingModule,{PingStore} from './../../../store/modules/ping'
import * as _ from 'lodash'
import { PingServiceBase } from '../..';



export class Club extends PingServiceBase{

//http://localhost:56903/api/clubs/liste/paris
    constructor(vue:Vue){
       super(vue)

    }

    public searchClubByNom(numero:string){
        return this.query('ListeClubsByNom',numero)
    }
    

   
    
}

//export default auth

export default function ClubService(Vuee: typeof Vue){
    const club=new Club(new Vuee())
    
    Vue.prototype.$club = club;

    
} 